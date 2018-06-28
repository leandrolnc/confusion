import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

    class DishDetail extends Component{
        constructor(props){
            super(props);
            
        }


        renderComments(comments){
            if(comments != null){
                
                const comm = comments.map((cmt)=>{
                    return(
                        <li>
                            <div>{cmt.comment}</div>
                            <div>--{cmt.author},{cmt.date}</div>
                            <hr width="80%"/><br />
                        </li>
                    );
                });

                return(
                    <div className="table">
                        <h4>Comments</h4>
                        <ul class="list-unstyled">
                            {comm}
                        </ul>
                    </div>
                )

            }
        }

        render() {

            if(this.props.dish != null){

                return(
                    <Card>
                        <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                        <CardBody>
                          <CardTitle>{this.props.dish.name}</CardTitle>
                          <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                        {this.renderComments(this.props.dish.comments)}
                    </Card>
                    
                );

            }
            else{
                return(
                    <div></div>
                )
            }

        }

    }

    export default DishDetail;