import React, { useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';


function Form() {
    const {addWebsite, getIncomes, errorMsg, setErrorMsg, submitButtonDisabled, setSubmitButtonDisabled} = useGlobalContext();
    const [inputUrl, setInputUrl] = useState("");

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!inputUrl.trim() && !submitButtonDisabled){
            setErrorMsg("Url is required");
            await delay(3000);
            setErrorMsg("");
            return;
        }

        addWebsite(inputUrl)
        setInputUrl("");
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            {errorMsg && <p className='error'>{errorMsg}</p>}
            <div className="elem">
                <label>Enter Website URL</label> <br/>
                <input
                  className="input"
                  placeholder="https://google.com"
                  value={inputUrl}
                  onChange={(event) => setInputUrl(event.target.value)}
                />
            </div>
            
            <div className="submit-btn">
                <Button 
                    name={submitButtonDisabled ? "Adding..." : "Add"}
                    icon={submitButtonDisabled ? '' : plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={submitButtonDisabled ? 'var(--color-green)' : 'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}


const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    input{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        margin-top: 10px;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        width: 100%;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }

    .input-control{
        input{
            width: 100%;
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        }
    }
`;
export default Form