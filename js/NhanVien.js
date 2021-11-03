function NhanVien(taiKhoan,ten,email,matKhau,ngayLam,luong,chucVu,gioLam){
    this.taiKhoan = taiKhoan;
    this.ten = ten;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luong = luong;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.xepLoai = "";
    this.tongLuong = 0;
    
    this.tinhXepLoai = function(){
        if(gioLam >=192)    return "Xuất sắc";
        else if(gioLam >=176)   return "Giỏi";
        else if(gioLam >=160)   return "Khá";
        else    return "Trung bình";
    }

    this.tinhTongLuong = function(){
        if(chucVu == "Sếp")
            return luong*3;
        else if(chucVu == "Trưởng phòng")
            return luong*2;
        else if(chucVu == "Nhân viên")
            return luong;
    }
}