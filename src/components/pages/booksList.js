import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component {
    componentDidMount() {
        // Dispatch an action
        this.props.getBooks();
    }

    render() {
        const booksList = this.props.books.map((booksArr) => {
            return(
                <Col xs={12} sm={6} md={4} key={booksArr._id}>
                    <BookItem 
                        _id={booksArr._id}
                        title={booksArr.title}
                        description={booksArr.description}
                        images={booksArr.images}
                        price={booksArr.price}
                    ></BookItem>
                </Col>
            );
        });
        return (
            <Grid>
                <Row style={{marginTop: '15px'}}>
                    <Carousel style={{height: '500px', overflow: 'hidden'}}>
                        <Carousel.Item>
                            <img width={900} height={300} alt="900x300" src="/images/mr1.jpg" />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={300} alt="900x300" src="/images/mr2.jpg" />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={300} alt="900x300" src="/images/mr3.jpg" />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>;
                </Row>
                <Row style={{marginTop: '15px'}}>
                    <Cart />
                </Row>
                <Row style={{marginTop: '15px'}}>
                    {/* <Col xs={12} sm={6}>
                        <BooksForm />
                    </Col> */}
                    {booksList}
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.books.books
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getBooks
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
