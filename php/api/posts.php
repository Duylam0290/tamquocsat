<?php
require_once '../config.php';

$conn = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Get post ID or slug from URL
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$slug = isset($_GET['slug']) ? $_GET['slug'] : null;
$action = isset($_GET['action']) ? $_GET['action'] : null;

switch ($method) {
    case 'GET':
        if ($id) {
            // Get single post by ID
            getPostById($conn, $id);
        } elseif ($slug) {
            // Get single post by slug
            getPostBySlug($conn, $slug);
        } else {
            // Get all posts with optional filters
            getAllPosts($conn);
        }
        break;
        
    case 'POST':
        createPost($conn);
        break;
        
    case 'PUT':
        if ($id) {
            updatePost($conn, $id);
        } else {
            sendResponse(false, null, 'Post ID required', 400);
        }
        break;
        
    case 'DELETE':
        if ($id) {
            deletePost($conn, $id);
        } else {
            sendResponse(false, null, 'Post ID required', 400);
        }
        break;
        
    default:
        sendResponse(false, null, 'Method not allowed', 405);
}

// Get all posts
function getAllPosts($conn) {
    $category = isset($_GET['category']) ? $_GET['category'] : null;
    $status = isset($_GET['status']) ? $_GET['status'] : null;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 20;
    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
    $search = isset($_GET['search']) ? $_GET['search'] : null;
    
    $sql = "SELECT id, title, slug, excerpt, thumbnail, category, tags, status, views, created_at, published_at FROM posts WHERE 1=1";
    $params = [];
    $types = '';
    
    if ($category) {
        $sql .= " AND category = ?";
        $params[] = $category;
        $types .= 's';
    }
    
    if ($status) {
        $sql .= " AND status = ?";
        $params[] = $status;
        $types .= 's';
    }
    
    if ($search) {
        $sql .= " AND (title LIKE ? OR content LIKE ?)";
        $searchParam = "%$search%";
        $params[] = $searchParam;
        $params[] = $searchParam;
        $types .= 'ss';
    }
    
    $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;
    $types .= 'ii';
    
    $stmt = $conn->prepare($sql);
    if ($types && count($params) > 0) {
        $stmt->bind_param($types, ...$params);
    }
    $stmt->execute();
    $result = $stmt->get_result();
    
    $posts = [];
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
    
    // Get total count
    $countSql = "SELECT COUNT(*) as total FROM posts WHERE 1=1";
    if ($category) $countSql .= " AND category = '$category'";
    if ($status) $countSql .= " AND status = '$status'";
    $countResult = $conn->query($countSql);
    $total = $countResult->fetch_assoc()['total'];
    
    sendResponse(true, [
        'posts' => $posts,
        'total' => $total,
        'limit' => $limit,
        'offset' => $offset
    ]);
}

// Get single post by ID
function getPostById($conn, $id) {
    $stmt = $conn->prepare("SELECT * FROM posts WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        // Increment view count
        $conn->query("UPDATE posts SET views = views + 1 WHERE id = $id");
        sendResponse(true, $row);
    } else {
        sendResponse(false, null, 'Post not found', 404);
    }
}

// Get single post by slug
function getPostBySlug($conn, $slug) {
    $stmt = $conn->prepare("SELECT * FROM posts WHERE slug = ?");
    $stmt->bind_param("s", $slug);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        // Increment view count
        $conn->query("UPDATE posts SET views = views + 1 WHERE id = " . $row['id']);
        sendResponse(true, $row);
    } else {
        sendResponse(false, null, 'Post not found', 404);
    }
}

// Create new post
function createPost($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        sendResponse(false, null, 'Invalid JSON data', 400);
    }
    
    $title = isset($data['title']) ? trim($data['title']) : '';
    $content = isset($data['content']) ? $data['content'] : '';
    $excerpt = isset($data['excerpt']) ? trim($data['excerpt']) : '';
    $thumbnail = isset($data['thumbnail']) ? trim($data['thumbnail']) : '';
    $category = isset($data['category']) ? $data['category'] : 'thong-tin';
    $tags = isset($data['tags']) ? $data['tags'] : '';
    $status = isset($data['status']) ? $data['status'] : 'draft';
    $publishedAt = isset($data['published_at']) ? $data['published_at'] : null;
    
    if (empty($title)) {
        sendResponse(false, null, 'Title is required', 400);
    }
    
    // Generate slug from title
    $slug = createSlug($title);
    
    // Check if slug exists
    $checkStmt = $conn->prepare("SELECT id FROM posts WHERE slug = ?");
    $checkStmt->bind_param("s", $slug);
    $checkStmt->execute();
    if ($checkStmt->get_result()->num_rows > 0) {
        $slug .= '-' . time();
    }
    
    // Auto-generate excerpt if not provided
    if (empty($excerpt) && !empty($content)) {
        $excerpt = mb_substr(strip_tags($content), 0, 200) . '...';
    }
    
    $stmt = $conn->prepare("INSERT INTO posts (title, slug, content, excerpt, thumbnail, category, tags, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssss", $title, $slug, $content, $excerpt, $thumbnail, $category, $tags, $status, $publishedAt);
    
    if ($stmt->execute()) {
        $newId = $conn->insert_id;
        sendResponse(true, ['id' => $newId, 'slug' => $slug], 'Post created successfully', 201);
    } else {
        sendResponse(false, null, 'Failed to create post: ' . $conn->error, 500);
    }
}

// Update post
function updatePost($conn, $id) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        sendResponse(false, null, 'Invalid JSON data', 400);
    }
    
    // Build dynamic update query
    $updates = [];
    $params = [];
    $types = '';
    
    $allowedFields = ['title', 'content', 'excerpt', 'thumbnail', 'category', 'tags', 'status', 'published_at'];
    
    foreach ($allowedFields as $field) {
        if (isset($data[$field])) {
            $updates[] = "$field = ?";
            $params[] = $data[$field];
            $types .= 's';
        }
    }
    
    // Update slug if title changed
    if (isset($data['title'])) {
        $newSlug = createSlug($data['title']);
        // Check if new slug conflicts with other posts
        $checkStmt = $conn->prepare("SELECT id FROM posts WHERE slug = ? AND id != ?");
        $checkStmt->bind_param("si", $newSlug, $id);
        $checkStmt->execute();
        if ($checkStmt->get_result()->num_rows > 0) {
            $newSlug .= '-' . time();
        }
        $updates[] = "slug = ?";
        $params[] = $newSlug;
        $types .= 's';
    }
    
    if (empty($updates)) {
        sendResponse(false, null, 'No fields to update', 400);
    }
    
    $sql = "UPDATE posts SET " . implode(", ", $updates) . " WHERE id = ?";
    $params[] = $id;
    $types .= 'i';
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            sendResponse(true, null, 'Post updated successfully');
        } else {
            sendResponse(false, null, 'Post not found or no changes made', 404);
        }
    } else {
        sendResponse(false, null, 'Failed to update post: ' . $conn->error, 500);
    }
}

// Delete post
function deletePost($conn, $id) {
    $stmt = $conn->prepare("DELETE FROM posts WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            sendResponse(true, null, 'Post deleted successfully');
        } else {
            sendResponse(false, null, 'Post not found', 404);
        }
    } else {
        sendResponse(false, null, 'Failed to delete post: ' . $conn->error, 500);
    }
}

// Helper: Create URL slug from Vietnamese text
function createSlug($text) {
    // Vietnamese characters mapping
    $vietnamese = array(
        'a' => array('à', 'á', 'ạ', 'ả', 'ã', 'â', 'ầ', 'ấ', 'ậ', 'ẩ', 'ẫ', 'ă', 'ằ', 'ắ', 'ặ', 'ẳ', 'ẵ'),
        'e' => array('è', 'é', 'ẹ', 'ẻ', 'ẽ', 'ê', 'ề', 'ế', 'ệ', 'ể', 'ễ'),
        'i' => array('ì', 'í', 'ị', 'ỉ', 'ĩ'),
        'o' => array('ò', 'ó', 'ọ', 'ỏ', 'õ', 'ô', 'ồ', 'ố', 'ộ', 'ổ', 'ỗ', 'ơ', 'ờ', 'ớ', 'ợ', 'ở', 'ỡ'),
        'u' => array('ù', 'ú', 'ụ', 'ủ', 'ũ', 'ư', 'ừ', 'ứ', 'ự', 'ử', 'ữ'),
        'y' => array('ỳ', 'ý', 'ỵ', 'ỷ', 'ỹ'),
        'd' => array('đ'),
    );
    
    foreach ($vietnamese as $nonAccent => $accents) {
        $text = str_replace($accents, $nonAccent, $text);
        $text = str_replace(array_map('mb_strtoupper', $accents), mb_strtoupper($nonAccent), $text);
    }
    
    $text = mb_strtolower($text);
    $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
    $text = preg_replace('/[\s-]+/', '-', $text);
    $text = trim($text, '-');
    
    return $text;
}

$conn->close();
?>
