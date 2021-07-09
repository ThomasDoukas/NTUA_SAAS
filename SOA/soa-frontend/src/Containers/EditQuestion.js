import React, { useRef, useContext, useState } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import AuthContext from '../source/auth-context';
import classes from '../Components/UI/AskQuestionForm.module.css'

const EditQuestion = () => {
    const history = useHistory();
    const location = useLocation();
    
    const titleInputRef = useRef();
    const bodyInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const [labelsList, setLabelsList] = useState([{ label_title: ""}]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...labelsList];
        list[index][name] = value;
        setLabelsList(list);
      };
       
      // handle click event of the Remove button
      const handleRemoveClick = index => {
        const list = [...labelsList];
        list.splice(index, 1);
        setLabelsList(list);
      };
       
      // handle click event of the Add button
      const handleAddClick = () => {
        setLabelsList([...labelsList, { label_title: ""}]);
      };

    const submitFunc = (e) => {
        if (e) e.preventDefault();
        const title = titleInputRef.current.value;
        const body = bodyInputRef.current.value;
        fetch('http://localhost:3000/saas/soa/esb',
                {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        "url-destination": `saas/soa/questions/${location.state.id}`,
                        'Authorization': 'Bearer ' + `${authCtx.jwt}`
                    },
                    body: JSON.stringify({
                        title: title,
                        body: body,
                        createdBy: location.state.createdBy,
                        labels: labelsList
                    })
                }).then(res => {
                    if (res.ok) {
                        alert('Question submitted succesfully!');
                        history.replace('/')
                        return res.json();
                    } else {
                        return res.json().then((data) => {
                        alert(data.message);
                        });
                    }
                });
                
            }

        return (
            <form onSubmit={submitFunc} className={classes.askQuestion}>

                <h1>Question Edit</h1>

                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Question Title</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" defaultValue={location.state.title} rows="1" name='title' required ref={titleInputRef} />
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Question Text</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" defaultValue={location.state.body} rows="5" name='body' required ref={bodyInputRef} />
                    </div>
                    
                    {labelsList.map((x, i) => {
                    return(
                    <div className={classes.actions}>
                        <input
                        name="labelTitle"
                        rows="1"
                        class="form-control"
                        placeholder='Add a keyword'
                        value={x.labelTitle}
                        onChange={e => handleInputChange(e, i)}
                        />
                        <br/>
                        <div className="btn-box">
                        {labelsList.length !== 1 && <button className="button" onClick={() => handleRemoveClick(i)}>Remove</button>}
                        {labelsList.length - 1 === i && <button className="button" onClick={handleAddClick} >Add</button>}
                        </div>
                    </div>
                    );
                    })}
                <br/>

                <div class="form-row">
                    <div class="col-auto">
                        <button class="btn btn-primary" style={{backgroundColor: "#AA06EE", borderColor: "#AA06EE"}} type="submit">Submit</button>
                    </div>

                    <div class="col-auto">
                        <a class="btn btn-danger" exact href="/" role="button">Cancel</a>
                    </div>
                </div>
            </form>            
        )
    }


export default EditQuestion;
