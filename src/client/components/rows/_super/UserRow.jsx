import React from "react"
import Styled from "styled-components"
import { Colors } from "../../../../config/style"

// components
const UserRowStyled = Styled.div`
.item {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${Colors.softGray};
  float: left;
  width: 100%;

  h4 {
    margin: 0;
    padding: 0;
  }
}
`

export default props => {
  return (
    <UserRowStyled>
      <div className="item">
        <a
          href={`/user/${props.username}`}
          target="blank"
          rel="noopener noreferer"
        >
          <h4>
            {props.username} - {props.fullname || props.username}
          </h4>
        </a>
        <p>
          Email {props.email} - Terdaftar sejak {props.register_date}
          <br />
          Moto: {props.moto || "-"}
          <br />
          Alamat : {props.address || "-"}
        </p>
        <span className="label label-gray">{props.level}</span>
        {props.is_verified ? (
          <span className="label label-green">telah konfirmasi</span>
        ) : null}
        {props.is_banned ? (
          <span className="label label-red">diblokir</span>
        ) : null}
      </div>
    </UserRowStyled>
  )
}
