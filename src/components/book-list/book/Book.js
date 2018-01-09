import React , {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {BookContainer, Actions, Edit} from './book.styled'; 

export default class Book extends Component { 

  state = { 
    imgLoaded: false
  }

  handleImgLoaded() { 
    this.setState({imgLoaded: true }); 
    console.log('asdf')
  }
  toUpperCaseFirstLetter(string) {
      return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ').replace( /([^a-z\s])/gi, "");
     
  }

  render() { 
    const { book: { title, auther, date, image_url, id },
      editHandler, deleteHandler } = this.props;

    return (
      <BookContainer>
        <Actions>
          <i className="material-icons" onClick={() => deleteHandler(id)}>close</i>
        </Actions>
        <Edit>
          <i className="material-icons" color={'green'} onClick={() => editHandler(id)}>edit</i>
        </Edit>
        { 
          !this.state.imgLoaded && 
          <CircularProgress />
        }
        <img 
          src={image_url} 
          alt='book-cover' 
          onLoad={this.handleImgLoaded.bind(this)} 
        />
 
        <div style={{textAlign: 'left'}}>
       
          <img 
              height={'70px'}
             src={'https://dogbedslargedogs.net/wp-content/plugins/wp-price-comparison/modules/images/5-Stars.png'} 
             alt='rating' 
          />

          <p><b>{this.toUpperCaseFirstLetter(title)}</b></p>
          <p>{this.toUpperCaseFirstLetter(auther)}</p>
          <p>{date}</p>

        </div>
       </BookContainer>
    )
  }
  
}