import {Form,Button} from 'react-bootstrap';

const ReviewForm = ({handleSubmit,revText,labelText,defaultValue}) => {

  const handleLocalSubmit = (e) => {
    if(!e || typeof e.preventDefault === 'function') e.preventDefault();
    if(typeof handleSubmit === 'function'){
      try{
        handleSubmit(e);
      }
      catch(err){
        // error handled by parent
      }
    }
    else{
      // no parent handler provided
    }
  }

  return (

    <Form onSubmit={handleLocalSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
        </Form.Group>
        <Button type="submit" variant="outline-info">Submit</Button>
    </Form>   

  )
}

export default ReviewForm