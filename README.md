# Sàn TMĐT SMe(Shopee) (Đồ án tốt nghiệp) (v2.0.2)
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
## Kiến trúc phần mềm
![ShopeeMe-SequenceDiagram-Class_Diagram drawio](https://github.com/user-attachments/assets/c75c3751-11ea-4107-ad2b-768d7b38ce1f)
## Kết quả thực hiện
### Trang chủ
![image](https://github.com/user-attachments/assets/30fe421d-378d-4e08-8a2c-ecc58ec0202a)
![image](https://github.com/user-attachments/assets/a4f05401-3c55-432e-9a8d-73b5bf4f9772)
![image](https://github.com/user-attachments/assets/c6a6d62b-1f22-4b19-8a66-a65dcd49a1cf)
![image](https://github.com/user-attachments/assets/e2c3a6bc-199c-4f90-ab33-6f8711133895)
### Trang nhập
![image](https://github.com/user-attachments/assets/06e8f0d3-628f-42ac-aa3c-fa0f24fcdbca)
### Trang đăng ký
![image](https://github.com/user-attachments/assets/224fc174-8b2e-4b29-9422-3ca0afe0df81)
### Trang gợi ý
![image](https://github.com/user-attachments/assets/01112b14-783e-4b0d-9583-6d4186394270)
### Trang sản phẩm tương tự
![image](https://github.com/user-attachments/assets/78f7eb1f-af99-4ccc-b980-db57efa32a0c)
### Trang sản phẩm
![image](https://github.com/user-attachments/assets/3277c28e-a6a9-465c-87f6-5644a9578178)
![image](https://github.com/user-attachments/assets/380a489f-85df-4042-ac73-0732f90b3802)
### Trang cửa hàng
![Screenshot 2024-11-08 174151](https://github.com/user-attachments/assets/0f29dded-b194-4adc-8eca-34ee3c6b2e3e)
![image](https://github.com/user-attachments/assets/6fde07b9-0cac-49c7-ad95-c99f060621f5)
### Chi tiết sản phẩm
![image](https://github.com/user-attachments/assets/cfaa7bb1-68f9-41cd-9128-b7e75d91652c)
![image](https://github.com/user-attachments/assets/7036bda2-6a70-4d7b-ae95-603935bfd0f4)
### Bình luận, đánh giá sản phẩm
![image](https://github.com/user-attachments/assets/96c17b57-341d-4bd9-84cb-3d37acd72f43)
![image](https://github.com/user-attachments/assets/b41a4764-54dd-4e31-9a93-c5012c112795)
### Giỏ hàng
![image](https://github.com/user-attachments/assets/488fb398-7e8b-4840-bb77-911e5c112c1d)
![image](https://github.com/user-attachments/assets/b44e8532-64be-48b7-b9c5-94c78f8af912)
### Trạng thái đơn hàng
![image](https://github.com/user-attachments/assets/8e7aeff2-611c-4ce9-b91c-3731d01a7a11)
![image](https://github.com/user-attachments/assets/8ba2ee1f-0892-4152-b790-7f20b14d1196)
### Đơn mua
![image](https://github.com/user-attachments/assets/e3ea36f6-811f-4848-aed2-3ab9d2941213)
### Kênh Sàn TMĐT
![image](https://github.com/user-attachments/assets/9b81316d-9756-4b7b-9a0d-d6656c2a4595)
### Kênh người bán
![image](https://github.com/user-attachments/assets/0cae4cca-3932-47ad-8776-88cda161895c)
### Kênh vận chuyển
![image](https://github.com/user-attachments/assets/37d3f3e6-a3ba-4ea8-bdb9-9b202c3af710)
![image](https://github.com/user-attachments/assets/b856c8dc-cdd3-4fdc-8830-914747b567c1)
![image](https://github.com/user-attachments/assets/69b7955a-a9c5-4288-8ef0-fcf57303e96c)
![image](https://github.com/user-attachments/assets/18b61db6-a712-408f-a582-990c374d7aa4)


















