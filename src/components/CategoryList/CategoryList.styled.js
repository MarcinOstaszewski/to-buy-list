import styled from "styled-components";

const StyledCategoryList = styled.main`
  .list-name {
    width: 100%;
    font-size: ${props => props.baseValue * 2}px;
    margin: 0 0 ${props => props.baseValue / 6}px ${props => props.baseValue * 4}px;
    font-weight: 600;
    text-transform: uppercase;
  }
  .to-buy-list,
  .waiting-list {
    padding: ${props => props.baseValue}px;
    display: flex;
    flex-wrap: wrap;
  }
  
  .waiting-list {
    opacity: .7;
  }

  .category,
  .product {
    color: #fff;
    margin: ${props => props.baseValue / 4}px 1px;
	cursor: pointer;
  }

  .category {
    display: flex;
    flex-wrap: wrap;
    padding: var(--default-padding);
    border-radius: var(--border-radius) 0 0 var(--border-radius);

    &.is-empty {
      border-radius: var(--border-radius-when-empty);
      margin-right: ${props => props.baseValue / 4}px;
    }
  }

  .product {
    padding: var(--default-padding);
    &.is-last {
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      margin-right: ${props => props.baseValue}px;
    }
  }
`;

export default StyledCategoryList;
