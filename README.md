
# Swigito API Documentation

## Base URL
`https://swigito.onrender.com/api/v1`

## User Routes
### POST `/user/register`
- **Description:** Register a new user.

### POST `/user/register-seller`
- **Description:** Register a new seller.

### POST `/user/login`
- **Description:** Login a user.

### POST `/user/logout`
- **Description:** Logout a user.

### POST `/user/forgot-password`
- **Description:** Initiate password reset.

### POST `/user/verify-otp`
- **Description:** Verify OTP for password reset.

### POST `/user/change-password`
- **Description:** Change user password.

### GET `/user/profile`
- **Description:** Get user profile details.
- **Middleware:** `protectRoute`

### PUT `/user/edit-profile`
- **Description:** Edit user profile.
- **Middleware:** `protectRoute`

### DELETE `/user/deleteUser/:id`
- **Description:** Delete a user by ID.

### POST `/user/wishlist/add`
- **Description:** Add an item to the wishlist.
- **Middleware:** `protectRoute`

### DELETE `/user/wishlist/remove/:id`
- **Description:** Remove an item from the wishlist by ID.
- **Middleware:** `protectRoute`

## Product Routes
### POST `/product/add`
- **Description:** Add a new product.
- **Middleware:** `protectRoute`, `upload.single("image")`

### GET `/product/get`
- **Description:** Get all products.

### GET `/product/get/:id`
- **Description:** Get a product by ID.

## Payment Routes
### POST `/pay/create-payment-intent`
- **Description:** Create a payment intent.

## Order Routes
### POST `/orders/create`
- **Description:** Create a new order.
- **Middleware:** `protectRoute`

## Coupon Routes
### POST `/coupon/create`
- **Description:** Create a new coupon.
- **Middleware:** `protectRoute`, `isSeller`

### POST `/coupon/apply`
- **Description:** Apply a coupon.
- **Middleware:** `protectRoute`

### GET `/coupon/`
- **Description:** Fetch all coupons.
- **Middleware:** `protectRoute`

## Category Routes
### POST `/category/create`
- **Description:** Create a new category.
- **Middleware:** `protectRoute`

### GET `/category/`
- **Description:** Get all categories.

### PUT `/category/edit/:categoryId`
- **Description:** Edit a category by ID.
- **Middleware:** `protectRoute`

### DELETE `/category/delete/:categoryId`
- **Description:** Delete a category by ID.
- **Middleware:** `protectRoute`

## Cart Routes
### POST `/cart/add`
- **Description:** Add an item to the cart.
- **Middleware:** `protectRoute`

### GET `/cart/`
- **Description:** Get all items in the cart.
- **Middleware:** `protectRoute`

### PUT `/cart/quantity`
- **Description:** Update the quantity of an item in the cart.
- **Middleware:** `protectRoute`

### DELETE `/cart/remove/:productId`
- **Description:** Remove an item from the cart by product ID.
- **Middleware:** `protectRoute`

## Brand Routes
### POST `/brand/create`
- **Description:** Create a new brand.
- **Middleware:** `protectRoute`

### GET `/brand/`
- **Description:** Get all brands.

### PUT `/brand/edit/:brandId`
- **Description:** Edit a brand by ID.
- **Middleware:** `protectRoute`

### DELETE `/brand/delete/:brandId`
- **Description:** Delete a brand by ID.
- **Middleware:** `protectRoute`

## Blog Routes
### POST `/blog/add`
- **Description:** Add a new blog.
- **Middleware:** `protectRoute`

### POST `/blog/like/:blogId`
- **Description:** Like a blog by ID.
- **Middleware:** `protectRoute`

### POST `/blog/comment/:blogId`
- **Description:** Add a comment to a blog by ID.
- **Middleware:** `protectRoute`

### GET `/blog/`
- **Description:** Get all blogs.

### PUT `/blog/edit/:blogId`
- **Description:** Edit a blog by ID.
- **Middleware:** `protectRoute`

### DELETE `/blog/delete/:blogId`
- **Description:** Delete a blog by ID.
- **Middleware:** `protectRoute`

### DELETE `/blog/:blogId/comment/delete/:commentId`
- **Description:** Delete a comment by ID from a blog.
- **Middleware:** `protectRoute`

### PUT `/blog/:blogId/comment/edit/:commentId`
- **Description:** Edit a comment by ID on a blog.
- **Middleware:** `protectRoute`

## Auth Routes
### POST `/auth/verify-token`
- **Description:** Verify the authenticity of a token.
