import React from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "./HomeChild.css";
import CustomAPI from "../Component/baseApi";

const HomeChild = ({ data, query }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [show, setShow] = useState(false);
  const [upshow, setUpshow] = useState(false);
  const [addDetails, setAddDetails] = useState({
    Title: "",
    Body: "",
  });
  const [view, setView] = useState(1);
  const [editDetails, setEditDetails] = useState({
    upTitle: "",
    upBody: "",
  });

  const DetailsperPage = 10;
  const pageVisited = pageNumber * DetailsperPage;
  const pageCount = Math.ceil(data.length / DetailsperPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const handleUpShow = () => setUpshow(true)
const handleUpClose = () => setUpshow(false)

  const handleAdd = (e) => {
    setAddDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleView = (id) => {
    setView((prev) => (prev.view !== id ? id : ""));
  };

const handleEdit = (e) =>{
  setEditDetails((prev)=>({...prev, [e.target.name]:e.target.value}))
}


  //* This is for http get method

  const handleCreate = () => {
    setShow(false);
    window.location.reload(false);
    const OBJ = {
      userId: data[data.length - 1].id + 1,
      id: data[data.length - 1].id + 1,
      title: addDetails.Title,
      body: addDetails.Body,
    };
    CustomAPI.post("/postJson", OBJ)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };


    //* This is for http put method

  const handleUpdate = () => {
    setShow(false);
    window.location.reload(false);

    const OBJ = {
      title: editDetails.upTitle,
      body: editDetails.upBody,
    };
    CustomAPI.put(`/postJson/${view}`, OBJ)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };


    //* This is for http delete method

  const DeleteUser = (()=>{
    window.location.reload(false);
    CustomAPI.delete(`/postJson/${view}`)
    .then((res)=>console.log(res.data))
    .catch((err)=>console.log(err))
  })


  return (
    <div>
      <Button onClick={handleShow}>Add</Button>

      {/* This displays the Modal when click the Add button */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ top: "20%" }}
      >
        <h1>Add Details</h1>
        <Form className="p-5 pt-3 pb-3">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="email" name="Title" onChange={handleAdd} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="Body"
              onChange={handleAdd}
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleCreate}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* This is Card Iteration */}
      {data
        .filter(({ title, body }) => {
          return (
            title.toLowerCase().includes(query) ||
            body.toLowerCase().includes(query)
          );
        })
        .slice(pageVisited, pageVisited + DetailsperPage)
        .map((item) => {
          return (
            <div key={item.id}>
              {item.title && (
                <Card
                  bg="light"
                  text="dark"
                  className="mb-2 mt-5"
                  onClick={() => handleView(item.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <Card.Title className="text-center">
                      {item.title?.toUpperCase()}
                    </Card.Title>
                    <Card.Text>{`${item.body}.`}</Card.Text>

                    {/* This displays the view and hide in iteration */}
                    {view === item.id ? (
                      <>
                        <Button variant="warning" onClick={handleUpShow}>
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          className="m-3"
                          onClick={DeleteUser}
                        >
                          delete
                        </Button>
                      </>
                    ) : null}
                  </Card.Body>
                </Card>
              )}
            </div>
          );
        })}

      {/* This is for Edit button */}

      <Modal
        show={upshow}
        onHide={handleUpClose}
        backdrop="static"
        keyboard={false}
        style={{ top: "20%" }}
      >
        <h1>Edit Details</h1>
        <Form className="p-5 pt-3 pb-3">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="email" name="upTitle" onChange={handleEdit} 
            value={editDetails.upTitle || ""}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="upBody"
              onChange={handleEdit}
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="danger" onClick={handleUpClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>


      {/* This is PAGINATION */}

      <div className="mt-5">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
};

export default HomeChild;
