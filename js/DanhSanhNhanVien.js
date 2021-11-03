function DanhSachNhanVien(){
    //this đại diện cho lớp đối tượng
    //Property
    this.mangNV = [];
    //Method
    this.themNV = function(nv){
        this.mangNV.push(nv);
    }
    this.timViTri = function(taiKhoan){
        var viTri = -1;
        this.mangNV.map(function(nv,index){
            if(nv.taiKhoan == taiKhoan){
                viTri = index;
            }
        });
        return viTri;
    }

    this.xoaNV = function(taiKhoan){
        var viTri = this.timViTri(taiKhoan);
        if(viTri >-1){
            //found
            this.mangNV.splice(viTri,1);
        }
    }

    this.layChiTiet = function(taiKhoan){
        var viTri = this.timViTri(taiKhoan);
        if(viTri >-1){
            //tìm thấy
            return this.mangNV[viTri];
        }else{
            console.log("Không tìm thấy");
        }
    }

    this.capNhatNV = function(nv){
        var viTri = this.timViTri(nv.taiKhoan);
        if(viTri >-1){
            //tìm thấy
            this.mangNV[viTri] = nv;
        }else{
            console.log("Không tìm thấy");
        }
    }
}

DanhSachNhanVien.prototype.searchName = function (tuKhoa){
    var mangTK = [];
    var tk = tuKhoa.trim().toLowerCase();
    this.mangNV.map(function(nv){
        var xepLoai = nv.xepLoai.toLowerCase();
        if(xepLoai.indexOf(tk) > -1){
            mangTK.push(nv);
        }
    });
    return mangTK;
}