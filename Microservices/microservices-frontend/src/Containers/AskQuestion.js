import React, { useRef, useContext, useState } from 'react';
import {useHistory} from 'react-router-dom';
import AuthContext from '../source/auth-context';
import classes from '../Components/UI/AskQuestionForm.module.css'

const AskQuestion = () => {
    const history = useHistory();
    
    const titleInputRef = useRef();
    const bodyInputRef = useRef();

    const authCtx = useContext(AuthContext);

    const [labelsList, setLabelsList] = useState([{ label_title: ""}]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...labelsList];
        list[index][name] = value;
        setLabelsList(list);
        //console.log(labelsList);
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
        const list = labelsList;
        const help = list.filter(function(item) {
            return item.labelTitle !== ""
        });
        fetch('https://saas21-team47-ms-mng-questions.herokuapp.com/saas/microservices/manageQuestions/',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${authCtx.jwt}`
                    },
                    body: JSON.stringify({
                        title: title,
                        body: body,
                        createdBy: authCtx.email,
                        labels: help
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

                <h1>Ask a Question</h1>

                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Question Title</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Add a title' rows="1" name='title' required ref={titleInputRef} />
                    </div>

                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Question Text</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" placeholder='Add a question body' rows="5" name='body' required ref={bodyInputRef} />
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

                <div className="form-row">
                    <div className="col-auto">
                        <button className="btn btn-primary" style={{backgroundColor: "#AA06EE", borderColor: "#AA06EE"}} type="submit">Submit</button>
                    </div>

                    <div className="col-auto">
                        <a className="btn btn-danger" exact href="/" role="button">Cancel</a>
                    </div>
                </div>
            </form>            
        )
    }


export default AskQuestion;

