import React, { useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';


function Form() {
    const {addWebsite, getIncomes, errorMsg, setErrorMsg} = useGlobalContext();
    const [inputUrl, setInputUrl] = useState("");

    const handleSubmit = e => {
        e.preventDefault()
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
                    name={'Add Website'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
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
        resize: none;
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
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;
export default Form