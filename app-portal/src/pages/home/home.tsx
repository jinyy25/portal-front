
import React, {useEffect, useState} from "react";
import './home.scss';
import {Button} from "devextreme-react/button";
import {POST} from "../../contexts/fetch-action";

import DataGrid, {Column, DataGridTypes, FilterRow, Pager, Paging} from "devextreme-react/data-grid";

export default function Home() {

  const [data, setData] = useState<any[]>([])
  // const [resultList, setResultList] = useState<any[]>([]);

  useEffect(() => {
    onClickSearch();
  } , [])


  const onClickAdd = () =>{
      var body={
          fileId: "",
          title: "test",
          content: "추가"
      }

      const response = POST("/api/search/add",body, {});
      response.then((response)=>{
          console.log("success");
       }).catch((error)=>{
          console.log(error);
       })
  }

  const onClickSearch = () =>{
      var body={
          infoId: "",
          title: "",
          content: ""
      }

      const response = POST("/api/search/list",body, {});
      response.then((response)=>{
        setData(response?.data);
       }).catch((error)=>{
          console.log(error);
       })
  }


  return (
    <React.Fragment>
      <h2 className={'content-block'}>Home</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>

          <Button
              width={100}
              text="추가"
              type="default"
              stylingMode="contained"
              onClick={()=> onClickAdd()}
            />

          <Button
            width={100}
            text="검색"
            type="default"
            stylingMode="outlined"
            onClick={()=> onClickSearch()}
          />

          <DataGrid dataSource={data.map((item, index) => ({ ...item, index: index + 1 }))}
                       showBorders={true} hoverStateEnabled={true}
             >


                 <Column dataField="infoId" caption="번호" width='20%'/>
                 <Column dataField="title" caption="제목" width='40%'/>
                 <Column dataField="content" caption="내용" width='40%'/>


             </DataGrid>
        </div>
      </div>
    </React.Fragment>
)}
