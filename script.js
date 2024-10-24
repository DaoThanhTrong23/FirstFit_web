function phanBo() {
    // Lấy số lượng khối nhớ từ input có id="sokhoi" và chuyển thành kiểu số nguyên
    const sokhoi = parseInt(document.getElementById('sokhoi').value);
    
    // Lấy số lượng tiến trình từ input có id="sotientrinh" và chuyển thành kiểu số nguyên
    const sotientrinh = parseInt(document.getElementById('sotientrinh').value);
    
    // Lấy kích thước các khối nhớ từ input (chuỗi các số cách nhau bằng dấu phẩy), tách thành mảng và chuyển thành số nguyên
    const kichthuockhoi = document.getElementById('kichthuockhoi').value.split(',').map(Number);
    
    // Lấy kích thước các tiến trình từ input (chuỗi các số cách nhau bằng dấu phẩy), tách thành mảng và chuyển thành số nguyên
    const kichthuoctientrinh = document.getElementById('kichthuoctientrinh').value.split(',').map(Number);

    // Tạo mảng `tientrinh` để lưu khối nhớ mà mỗi tiến trình được phân bổ, khởi tạo với giá trị -1 (chưa phân bổ)
    let tientrinh = Array(sotientrinh).fill(-1);
    
    // Tạo mảng `phanmanh` để lưu phần mảnh bộ nhớ (kích thước còn dư sau khi phân bổ), khởi tạo với giá trị 0
    let phanmanh = Array(sotientrinh).fill(0);

    // Vòng lặp duyệt qua từng tiến trình
    for (let i = 0; i < sotientrinh; i++) {
        // Vòng lặp duyệt qua từng khối nhớ để tìm khối phù hợp cho tiến trình i
        for (let j = 0; j < sokhoi; j++) {
            // Nếu khối nhớ j đủ lớn để chứa tiến trình i
            if (kichthuockhoi[j] >= kichthuoctientrinh[i]) {
                // Gán tiến trình i cho khối nhớ j
                tientrinh[i] = j + 1;  // +1 để khối nhớ bắt đầu từ 1 thay vì 0
                
                // Tính phần mảnh bộ nhớ còn lại sau khi phân bổ tiến trình i vào khối j
                phanmanh[i] = kichthuockhoi[j] - kichthuoctientrinh[i];
                
                // Giảm kích thước khối j sau khi phân bổ tiến trình i
                kichthuockhoi[j] -= kichthuoctientrinh[i];
                
                // Dừng vòng lặp sau khi phân bổ tiến trình i vào một khối nhớ
                break;
            }
        }
    }

    // Lấy phần tử HTML có id="resultBody" để hiển thị kết quả phân bổ
    const resultBody = document.getElementById('resultBody');
    
    // Xóa nội dung cũ trong bảng kết quả
    resultBody.innerHTML = '';

    // Vòng lặp qua từng tiến trình để hiển thị kết quả
    for (let i = 0; i < sotientrinh; i++) {
        // Tạo hàng (row) mới cho bảng kết quả với thông tin về tiến trình, kích thước, khối nhớ và phần mảnh
        const row = `<tr>
            <td>Tiến trình ${i + 1}</td>
            <td>${kichthuoctientrinh[i]}</td>
            <td>${tientrinh[i] !== -1 ? 'Khối ' + tientrinh[i] : 'Không đủ bộ nhớ'}</td>
            <td>${tientrinh[i] !== -1 ? phanmanh[i] : 'N/A'}</td>
        </tr>`;
        
        // Thêm hàng vừa tạo vào bảng kết quả
        resultBody.innerHTML += row;
    }
}
