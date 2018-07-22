import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


class CommentForm extends Component {

    constructor(props) {
        super(props);    

        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            isModalOpen: false
        };        
    }
    
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }     

      handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        //this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }      

    render(){
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);

        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                    <option value="1">1 - Not Good</option>
                                    <option value="2">2 - Reasonable</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very good</option>
                                    <option value="5">5 - Fantastic</option>
                                </Control.select>

                            </Row>                    
                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />                                             
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                        className="form-control"
                                        rows="6"
                                        
                                    />
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>                    
                    </ModalBody>
                </Modal>    
            </div>
        );
    }
}

function RenderDish({dish}){

    return(

        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );

}

function RenderComments({comments, postComment, dishId}){
    if(comments != null){
        const comm = comments.map((cmt)=>{
            return(
                <li key={cmt.id}>
                    <div>{cmt.comment}</div>
                    <div>--{cmt.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmt.date)))}</div>
                    <hr width="80%"/><br />
                </li>
            );
        });

        return(
            <div className="table">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comm}
                </ul>
            </div>
        )

    }
}

const DishDetail = (props)=>{

    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>            
        );
    }
    else if (props.errMess){
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );       
    }
    else if(props.dish != null){

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} 
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                        <CommentForm dishId={props.dish.id} postComment={props.postComment} />
                    </div>
                </div>
            </div>
        );

    }
    else{
        return(
            <div></div>
        )
    }
}

export default DishDetail;