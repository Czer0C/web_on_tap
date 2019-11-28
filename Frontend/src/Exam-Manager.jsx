import React, { Component } from 'react';
import Modal from 'react-responsive-modal'; 

export default class ExamManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            examName: '',
            semester: 1,
            grade: 1,
            duration: '',
            title: '',
            content: '',
            author: '',
            note: ''

        }
        this.handleChangeExamName = this.handleChangeExamName.bind(this);
        this.handleChangeSemester = this.handleChangeSemester.bind(this);
        this.handleChangeGrade = this.handleChangeGrade.bind(this);
        this.handleChangeDuration = this.handleChangeDuration.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeAuthor = this.handleChangeAuthor.bind(this);
        this.handleChangeNote = this.handleChangeNote.bind(this);

        this.onConfirm = this.onConfirm.bind(this);
        
    }
    handleChangeExamName(event) {this.setState({examName:event.target.value})}
    handleChangeSemester(event) {this.setState({semester:event.target.value})}
    handleChangeGrade(event) {this.setState({grade:event.target.value})}
    handleChangeDuration(event) {this.setState({duration:event.target.value})}
    handleChangeTitle(event) {this.setState({title:event.target.value})}
    handleChangeContent(event) {this.setState({content:event.target.value})}
    handleChangeAuthor(event) {this.setState({author:event.target.value})}
    handleChangeNote(event) {this.setState({note:event.target.value})}
    

    validate() {
        if (this.state.examName === "" || 
            this.state.semester === "" || 
            this.state.grade === "" || 
            this.state.duration === "" || 
            this.state.title === "" || 
            this.state.content === "" ||
            this.state.author === "" ||
            this.state.note === "") {
            return false;
        }
        return true;
    }

    onOpenModal = () => {
        this.setState({ open: true });
      };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };

    onConfirm() {
        var item = {
            examName : this.state.examName,
            semester : this.state.semester,
            grade : this.state.grade,
            duration : this.state.duration,
            title : this.state.title,
            content : this.state.content,
            author : this.state.author,
            note : this.state.note
        }

        console.log(item)
        fetch(`http://localhost:9000/users/thembaikiemtra`, {
            method: `post`,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
          })
            .then((res) => res.json())
            .then((json) => {
                alert(json)
            })


        this.onCloseModal()



    }
    render() {
        const {
            open
        } = this.state
        return (
            <div className="product-page">
                <div className="section section-gray">
                    <div className="container">
                        <div class="main main-raised main-product">
                        <div className="row">
                            <div className="col">
                                <center>
                                    <h2>Đăng Bài</h2>
                                </center>
                                <div className="card">
                                    <div className="card-body">
                                    <form>
                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Tên Bài Kiểm Tra</label>
                                            <input  type="text" 
                                                    class="form-control" 
                                                    id="exampleFormControlInput1" 
                                                    placeholder=""
                                                    value={this.state.examName} 
                                                    onChange={this.handleChangeExamName}
                                            />
                                        </div>


                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Học Kỳ</label>
                                            <select class="form-control" 
                                                    id="exampleFormControlSelect1" 
                                                    value={this.state.semester} 
                                                    onChange={this.handleChangeSemester}
                                            >
                                                <option value="1">Giữa Học Kỳ I</option>
                                                <option value="2">Cuối Học Kỳ I</option>
                                                <option value="3">Giữa Học Kỳ II</option>
                                                <option value="4">Cuối Học Kỳ II</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Lớp</label>
                                            <select class="form-control" 
                                                    id="exampleFormControlSelect1"
                                                    value={this.state.grade} 
                                                    onChange={this.handleChangeGrade}
                                            >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Thời gian</label>
                                            <input  type="number" 
                                                    class="form-control" 
                                                    id="exampleFormControlInput1" 
                                                    placeholder=""
                                                    value={this.state.duration} 
                                                    onChange={this.handleChangeDuration}
                                            />
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Tựa Đề</label>
                                            <input  type="text" 
                                                    class="form-control" 
                                                    id="exampleFormControlInput1" 
                                                    placeholder=""
                                                    value={this.state.title} 
                                                    onChange={this.handleChangeTitle}
                                            />
                                                    
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Nội Dung Bài Đọc</label>
                                            <textarea   class="form-control" 
                                                        id="exampleFormControlTextarea1" 
                                                        rows="3"
                                                        value={this.state.content} 
                                                        onChange={this.handleChangeContent}
                                            />
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Tên Tác Giả</label>
                                            <input  type="text" 
                                                    class="form-control" 
                                                    id="exampleFormControlInput1" 
                                                    placeholder=""
                                                    value={this.state.author} 
                                                    onChange={this.handleChangeAuthor}
                                            />
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlInput1">Ghi chú</label>
                                            <textarea   class="form-control"
                                                        id="exampleFormControlTextarea1" 
                                                        rows="3"
                                                        value={this.state.note} 
                                                        onChange={this.handleChangeNote}
                                            />
                                        </div>
                                    </form>
                                    
                                    
                                    <center>
                                        <button className="btn btn-info" 
                                                disabled={this.validate() === true ? "" : "disabled"}
                                                onClick={this.onOpenModal}
                                        >
                                            Tạo
                                        </button>
                                    </center>
                                    </div>
                                </div>
                                </div>
                                <Modal open={open} onClose={this.onCloseModal} center>
                                    <h4 class="modal-title" id="exampleModalLabel">Xác Nhận Tạo</h4>
                                    <br/><br/>

                                    <button type="button" class="btn btn-warning" onClick={this.onCloseModal}>Đóng</button>
                                    <button type="button" class="btn btn-primary" onClick={this.onConfirm}>Xác Nhận</button>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}