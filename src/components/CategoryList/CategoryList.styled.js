import styled from "styled-components";

const StyledCategoryList = styled.main`
  main {
    width: 100%;
  }
  .to-buy-list,
  .waiting-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .category,
  .product {
    color: #fff;
    margin: 3px 1px;
	cursor: pointer;
  }

  .category {
    display: flex;
    flex-wrap: wrap;
    padding: var(--default-padding);
    border-radius: var(--border-radius) 0 0 var(--border-radius);

    &.is-empty {
      border-radius: var(--border-radius-when-empty);
    }
  }

  .product {
    padding: var(--default-padding);
    &.is-last {
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      margin-right: 10px;
    }
  }
`;

export default StyledCategoryList;
