# Sàn giao dịch - Shopee (Đồ án tốt nghiệp)
# Công nghệ: ASP.NET Core MVC  7.0
- Luồng sử lý dữ liệu cơ bản: 
![image](https://github.com/DangVanCong2301/Shopee/assets/111124018/380752c3-aafb-47ed-a503-971c3e655532)
## Thành phần chính
### Routing
- Dựa vào các request Để gọi các Controller

### Controller
- Thực hiện các logic code từ yêu cầu cảu request và trả về response

### View
- Giao diện HTML, CSS được trả về theo logic của controller

### Model
- Được sử dụng để tương tác với các trường dữ liệu của bảng (định nghĩa các field, primary keys, foreign key,...)
- Khi tương tác với các dữ liệu có thể viết vào 1 file Repository riêng

## Khác
### Repository 
- Nơi tương tác với các dữ liệu của thực thể
- Được sử dụng để lấy dữ liệu và tương tác với dữ liệu của table (create, read, update, delete)

### Viết thủ tục lưu trong CSDL
  - Thủ tục được viết trên Server và khi truy vấn ta chỉ cần gọi thủ tục đó
### Quy tắc đặt tên trong CSDL
 - Tên Database: db_ (Ví dụ: db_F4_Shop)
 - Tên bảng: tbl_ (Ví dụ tbl_Categories)
 - Tên thủ tục: sp_ (Ví dụL sp_GetCategories)
 - ...
## Kết quả thực hiện
### Trang chủ
![image](https://github.com/DangVanCong2301/Shopee/assets/111124018/699968b6-b840-4492-b95f-4a4906111570)
### Trang sản phẩm
![image](https://github.com/DangVanCong2301/Shopee/assets/111124018/910aaa41-4def-4061-a89e-c098ff4b78dd)
![image](https://github.com/DangVanCong2301/Shopee/assets/111124018/99323383-235a-4952-b122-2c5690a38866)
### Chi tiết sản phẩm
![image](https://github.com/DangVanCong2301/Shopee/assets/111124018/5e6b66ea-711c-476b-84fa-6718f7cbd220)
### Bình luận, đánh giá sản phẩm
![image](https://github.com/DangVanCong2301/Shopee/assets/111124018/a0ba7b83-b26f-40d9-9171-422402bfa703)
### Giỏ hàng
![image](https://github.com/DangVanCong2301/F4-Shop/assets/111124018/a8e018a9-86e4-4cbd-aca2-29a3d112b676)
### Quản lý thông tin tài khoản
![image](https://github.com/DangVanCong2301/F4-Shop/assets/111124018/bef0bda4-ea4b-46eb-af38-e77e64aee75f)
### Đơn mua
![image](https://github.com/user-attachments/assets/fd216ade-27c0-4b5d-9c9f-593fa1b5ded5)











