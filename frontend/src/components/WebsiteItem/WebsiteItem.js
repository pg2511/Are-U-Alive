import React, {useState} from "react";
import styled from "styled-components";
import active from "../../assets/active.png";
import down from "../../assets/down.png";
import Button from "../Button/Button";
import { trash } from "../../utils/Icons";

function WebsiteItem({ id, title, url, isActive, isDelete, deleteItem }) {

  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    deleteItem(id);
    setIsDeleted(true);
  }

  return (
    <WebsiteItemStyled isActive={isActive} isDelete={isDelete}>
      
      {isDelete ? (
        <Button
          icon={isDeleted ? "" : trash}
          name={isDeleted ? "Deleting" : ""}
          bRad={"10%"}
          bg={'var(--primary-color2'}
          color={"#ff0000"}
          iColor={"#fff"}
          hColor={"var(--color-green)"}
          onClick={() => handleDelete()}
        />
      ) : isActive ? (
        <img src={active} className="icon" />
      ) : (
        <img src={down} className="icon" />
      )}

      <div className="content">
        <h5>{url}</h5>
        {/* <div className="btn-con">
            <Button
              icon={trash}
              bPad={"1rem"}
              bRad={"50%"}
              bg={'var(--primary-color'}
              color={"#fff"}
              iColor={"#fff"}
              hColor={"var(--color-green)"}
              // onClick={() => deleteItem(id)}
            />
          </div> */}
      </div>
    </WebsiteItemStyled>
  );
}

const WebsiteItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 30px;
    height: 30px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    flex-grow: 1;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .btn-con {
      margin-left: auto;
    }
  }
`;

export default WebsiteItem;
