import { useState } from "react";
import { connect } from "react-redux";
import { Container, Wrapper, Top, Bottom, Line } from "./PaginationStyle";
import "./paginationStyle.css";
import { sorting } from "../actions/action";


const Pagination = (props) => {
  const data= props.filteredData
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
 
  const orderList = [
    { text: '↑ Name ascending', click:"name_asc"},
    { text: '↓ Name descending', click:"name_desc" },
    { text: '↑ Year ascending', click:"year_asc" },
    { text: "↓ Year descending", click:"year_desc" },
  ];
 
  const dataLimit = 6; //her sayfada 6 veri
  const pageLimit = 5; //altta gösterilecek sayfa sayısı
  const [pages] = useState(
    Math.round(data.length / dataLimit)
  ); //Gelen veriye göre oluşacak sayfa sayısı
  const [currentPage, setCurrentPage] = useState(1);
  
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }
  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <Container>
       <nav className="order" >
      <button className="button" onClick={toggle}>
      ⇅ Order By
      </button>
      {isOpen && <ul className="menu-links" onClick={toggle}>
        {orderList.map(item => (
          <li key={item.text} onClick={()=>props.sorting(item.click)}>
              {item.text}
          </li>
        ))}
      </ul>}
    </nav>
      {getPaginatedData().map((item, idx) => (
        <Wrapper key={item[0]}>
          <Top>
            <span>
              {item[4]} - {item[5]}
            </span>
            <span>{item[2]}</span>
          </Top>
          <Bottom>
            <span>{item[0]}</span>
            <span> - {item[3]}</span>
          </Bottom>
          <Line></Line>
        </Wrapper>
      ))}
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage >= pages ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    filteredData: state.filteredData,
  };
};
export default connect(mapStateToProps,{sorting})(Pagination);
