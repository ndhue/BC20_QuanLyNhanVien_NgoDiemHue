var dsnv = new DanhSachNhanVien();
var valid = new Validation();

function getELE(id){
    return document.getElementById(id);
}

function setLocalStorage(mangNV){
    localStorage.setItem("DSNV",JSON.stringify(mangNV));
}
function getLocalStorage(){
    if(localStorage.getItem("DSNV") != null){
        dsnv.mangNV =  JSON.parse(localStorage.getItem("DSNV"));
        hienThiTable(dsnv.mangNV);
    }
}
getLocalStorage();
function layThongTinNV(){
    var taiKhoan = getELE("tknv").value;
    var ten = getELE("name").value;
    var email = getELE("email").value;
    var matKhau = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luong = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;
    var isValid = true;

    isValid &= valid.checkEmpty(taiKhoan,"Tài khoản không được để trống","tbTKNV") && valid.checkUser(taiKhoan,"Tài khoản không được trùng","tbTKNV",dsnv.mangNV);

    //check tên sv
    isValid &= valid.checkEmpty(ten,"Tên không được để trống","tbTen") && valid.checkName(ten,"Tên không hợp lệ","tbTen");
    //check email
    isValid &= valid.checkEmpty(email,"Email không được để trống","tbEmail") && valid.checkEmail(email,"Email không hợp lệ","tbEmail");
    // check password
    isValid &= valid.checkEmpty(matKhau,"Mật khẩu không được để trống","tbMatKhau") && valid.checkPass(matKhau,"Mật khẩu không hợp lệ","tbMatKhau");
    // check chức vụ
    isValid &= valid.checkSelect("chucvu","Hãy chọn chức vụ","tbChucVu");
    // check ngày
    isValid &= valid.checkEmpty(ngayLam,"Ngày làm không được để trống","tbNgay") && valid.checkDate(ngayLam, "Ngày làm không đúng định dạng", "tbNgay");
    //check lương
    isValid &= valid.checkEmpty(luong,"Lương không được để trống","tbLuongCB") && valid.checkSalary(luong, "Lương phải từ 1000000 - 20000000", "tbLuongCB");
    //check giờ làm
    isValid &= valid.checkEmpty(gioLam,"Giờ làm không được để trống","tbGiolam") && valid.checkTime(gioLam, "Giờ làm phải từ 80 - 200", "tbGiolam");
    if(isValid){
        var nv = new NhanVien(taiKhoan.trim(),ten,email,matKhau,ngayLam,luong,chucVu,Number(gioLam));
        nv.xepLoai = nv.tinhXepLoai(gioLam);
        nv.tongLuong = nv.tinhTongLuong(chucVu,luong);
        dsnv.themNV(nv);
        hienThiTable(dsnv.mangNV);
        setLocalStorage(dsnv.mangNV);
    }
}

function hienThiTable(mangNV){
    var content = "";
    for(var i = 0; i < mangNV.length; i++){
        // var tr = "<tr><td>"+dssv.mangSV[i].maSV+"</td><tr></tr></tr>";
        //string template / template literal
        var trNV = `<tr>
            <td>${mangNV[i].taiKhoan}</td>
            <td>${mangNV[i].ten}</td>
            <td>${mangNV[i].email}</td>
            <td>${mangNV[i].ngayLam}</td>
            <td>${mangNV[i].chucVu}</td>
            <td>${mangNV[i].tongLuong}</td>
            <td>${mangNV[i].xepLoai}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaNhanVien('${mangNV[i].taiKhoan}')">Xóa</button>
                <button class="btn btn-info" onclick="xemChiTiet('${mangNV[i].taiKhoan}')" data-target="#myModal" data-toggle="modal">Xem</button>
            </td>
        </tr>`;
        content += trNV;
    }
    getELE("tableDanhSach").innerHTML = content;
}

function xoaNhanVien(taiKhoan){
    dsnv.xoaNV(taiKhoan);
    setLocalStorage(dsnv.mangNV);
    hienThiTable(dsnv.mangNV);
}

function xemChiTiet(taiKhoan){
    var nv = dsnv.layChiTiet(taiKhoan);
    console.log(nv);
    if(nv != undefined){
        getELE("tknv").value = nv.taiKhoan;
        getELE("name").value = nv.ten;
        getELE("email").value = nv.email;
        getELE("password").value = nv.matKhau;
        getELE("datepicker").value = nv.ngayLam;
        getELE("luongCB").value = nv.luong;
        getELE("chucvu").value = nv.chucVu;
        getELE("gioLam").value = nv.gioLam;
    }else{
        console.log("Không tìm được nv");
    }
}

function capNhat(){
    var taiKhoan = getELE("tknv").value;
    var ten = getELE("name").value;
    var email = getELE("email").value;
    var matKhau = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luong = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;
    var isValid = true;
    isValid &= valid.checkEmpty(taiKhoan,"Tài khoản không được để trống","tbTKNV") && valid.checkUser(taiKhoan,"Tài khoản không được trùng","tbTKNV",dsnv.mangNV);

    //check tên sv
    isValid &= valid.checkEmpty(ten,"Tên không được để trống","tbTen") && valid.checkName(ten,"Tên không hợp lệ","tbTen");
    //check email
    isValid &= valid.checkEmpty(email,"Email không được để trống","tbEmail") && valid.checkEmail(email,"Email không hợp lệ","tbEmail");
    // check password
    isValid &= valid.checkEmpty(matKhau,"Mật khẩu không được để trống","tbMatKhau") && valid.checkPass(matKhau,"Mật khẩu không hợp lệ","tbMatKhau");
    // check chức vụ
    isValid &= valid.checkSelect("chucvu","Hãy chọn chức vụ","tbChucVu");
    // check ngày
    isValid &= valid.checkEmpty(ngayLam,"Ngày làm không được để trống","tbNgay") && valid.checkDate(ngayLam, "Ngày làm không đúng định dạng", "tbNgay");
    //check lương
    isValid &= valid.checkEmpty(luong,"Lương không được để trống","tbLuongCB") && valid.checkSalary(luong, "Lương phải từ 1000000 - 20000000", "tbLuongCB");
    //check giờ làm
    isValid &= valid.checkEmpty(gioLam,"Giờ làm không được để trống","tbGiolam") && valid.checkTime(gioLam, "Giờ làm phải từ 80 - 200", "tbGiolam");
    if(isValid){
        var nv = new NhanVien(taiKhoan.trim(),ten,email,matKhau,ngayLam,luong,chucVu,Number(gioLam));
        nv.xepLoai = nv.tinhXepLoai(gioLam);  
        nv.tongLuong = nv.tinhTongLuong(chucVu,luong); 
        
        dsnv.capNhatNV(nv);
        hienThiTable(dsnv.mangNV);
        setLocalStorage(dsnv.mangNV);
    }
}

function resetForm(){
    getELE("formInput").reset();
    getELE("tbTKNV").style.display = "none";
    getELE("tbMatKhau").style.display = "none";
    getELE("tbTen").style.display = "none";
    getELE("tbEmail").style.display = "none";
    getELE("tbChucVu").style.display = "none";
    getELE("tbLuongCB").style.display = "none";
    getELE("tbGiolam").style.display = "none";
    getELE("tbNgay").style.display = "none";
}

getELE("searchName").onkeyup = function(){
    var tuKhoa = getELE("searchName").value;
    var mangTK = dsnv.searchName(tuKhoa);
    hienThiTable(mangTK);
}