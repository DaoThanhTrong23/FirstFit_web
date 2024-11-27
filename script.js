function phanBo()
{
    const sokhoi = parseInt(document.getElementById('sokhoi').value);
    const sotientrinh = parseInt(document.getElementById('sotientrinh').value);
    const kichthuockhoi = document.getElementById('kichthuockhoi').value.split(',').map(Number);
    const kichthuoctientrinh = document.getElementById('kichthuoctientrinh').value.split(',').map(Number);
    //lưu khối nhớ mà mỗi tiến trình được phân bổ, khởi tạo với giá trị -1 (chưa phân bổ)
    let tientrinh = Array(sotientrinh).fill(-1);
    //lưu phần mảnh bộ nhớ (kích thước còn dư sau khi phân bổ), khởi tạo với giá trị 0
    let phanmanh = Array(sotientrinh).fill(0);
    for (let i = 0; i < sotientrinh; i++)
    {
        for (let j = 0; j < sokhoi; j++)
        {
            if (kichthuockhoi[j] >= kichthuoctientrinh[i])
            {
                tientrinh[i] = j + 1
                phanmanh[i] = kichthuockhoi[j] - kichthuoctientrinh[i];
                kichthuockhoi[j] -= kichthuoctientrinh[i];
                break;
            }
        }
    }
    const resultBody = document.getElementById('resultBody');
    resultBody.innerHTML = '';
    for (let i = 0; i < sotientrinh; i++)
    {
        const row =
        `<tr>
            <td>Tiến trình ${i + 1}</td>
            <td>${kichthuoctientrinh[i]}</td>
            <td>${tientrinh[i] !== -1 ? 'Khối ' + tientrinh[i] : 'Không đủ bộ nhớ'}</td>
            <td>${tientrinh[i] !== -1 ? phanmanh[i] : 'N/A'}</td>
        </tr>`;
        resultBody.innerHTML += row;
    }
    const khoinhoconlai = document.getElementById('khoinhoconlai');
    khoinhoconlai.innerHTML = '';
    for(let i  = 0; i < sokhoi; i++)
    {
        const row = 
        `<tr>
            <td>Khối ${i + 1}</td>
            <td>${kichthuockhoi[i]}</td>
        </tr>`;
        khoinhoconlai.innerHTML += row;
    }
}
