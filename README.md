# Sàn TMĐT SMe(Shopee) (Đồ án tốt nghiệp) (v2.0.1)
# Công nghệ: ASP.NET Core MVC  7.0
- Luồng sử lý dữ liệu cơ bản: 
![ShopeeMe-SequenceDiagram-Software_Architecture drawio](https://github.com/user-attachments/assets/fd93c90b-e2d6-4118-b80e-6d50222115ce)
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
## Unit Testing (Kiểm thử đơn vị)
https://docs.google.com/spreadsheets/d/1ZXDqi9M9C59Rs9ZT_QM6zz7HuXFDN4jg/edit?gid=1570539229#gid=1570539229
## Kiến trúc phần mềm
![ShopeeMe-SequenceDiagram-Class_Diagram drawio](https://github.com/user-attachments/assets/c75c3751-11ea-4107-ad2b-768d7b38ce1f)
## Kết quả thực hiện
### Trang chủ
![image](https://github.com/user-attachments/assets/30fe421d-378d-4e08-8a2c-ecc58ec0202a)
![image](https://github.com/user-attachments/assets/a4f05401-3c55-432e-9a8d-73b5bf4f9772)
![image](https://github.com/user-attachments/assets/c6a6d62b-1f22-4b19-8a66-a65dcd49a1cf)
![image](https://github.com/user-attachments/assets/e2c3a6bc-199c-4f90-ab33-6f8711133895)
### Trang gợi ý
![image](https://github.com/user-attachments/assets/01112b14-783e-4b0d-9583-6d4186394270)
### Trang sản phẩm tương tự
![image](https://github.com/user-attachments/assets/78f7eb1f-af99-4ccc-b980-db57efa32a0c)
### Trang sản phẩm
![image](https://github.com/user-attachments/assets/3277c28e-a6a9-465c-87f6-5644a9578178)
![image](https://github.com/user-attachments/assets/380a489f-85df-4042-ac73-0732f90b3802)
### Trang cửa hàng
![image](https://github.com/user-attachments/assets/22da4dad-30e7-48e8-b229-652f06a0c0af)
![image](https://github.com/user-attachments/assets/6fde07b9-0cac-49c7-ad95-c99f060621f5)
### Chi tiết sản phẩm
![image](https://github.com/user-attachments/assets/cfaa7bb1-68f9-41cd-9128-b7e75d91652c)
![image](https://github.com/user-attachments/assets/7036bda2-6a70-4d7b-ae95-603935bfd0f4)
### Bình luận, đánh giá sản phẩm
![image](https://github.com/user-attachments/assets/96c17b57-341d-4bd9-84cb-3d37acd72f43)
![image](https://github.com/user-attachments/assets/b41a4764-54dd-4e31-9a93-c5012c112795)
### Giỏ hàng
![image](https://github.com/user-attachments/assets/3dabb2c3-0c7f-450d-917b-0f89b6e495db)
![image](https://github.com/user-attachments/assets/b44e8532-64be-48b7-b9c5-94c78f8af912)
### Trạng thái đơn hàng
![image](https://github.com/user-attachments/assets/42d9aeaa-397e-4f17-9139-56286afac590)
![image](https://github.com/user-attachments/assets/6379ef8c-e61e-479a-bc0a-f0c11002bbbf)
### Đơn mua
![image](https://github.com/user-attachments/assets/cfb3d74c-5037-4621-a277-1d1959bae48b)
### Kênh Sàn TMĐT
![image](https://github.com/user-attachments/assets/618f19b2-acfb-49a2-94c2-2870303803f4)
### Kênh người bán
![image](https://github.com/user-attachments/assets/414ed5a5-8e36-4e4c-b1bc-96d7897405c5)
### Kênh vận chuyển
![image](https://github.com/user-attachments/assets/57f5e4c1-e31c-45e8-8e7c-2f1432b45427)
![image](https://github.com/user-attachments/assets/646d0fb5-4030-4b81-bcc4-8d72456302c2)
![image](https://github.com/user-attachments/assets/02cad0c9-e2e3-4461-981b-cd18cc955e09)
![image](https://github.com/user-attachments/assets/aa972d6c-f0a6-4c47-b2e0-f9aac96c70d7)

















