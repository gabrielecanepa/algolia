const HeaderStyle = () => (
  <style jsx>
    {`
      display: flex;
      align-items: center;
      min-height: 50px;
      padding: 0.5rem 1rem;
      background-image: linear-gradient(to right, #8e43e7, #00aeff);
      color: #fff;
      margin-bottom: 1rem;

      .header__subtitle {
        color: #fff;
        text-decoration: none;
      }
      .header__title {
        font-size: 1.2rem;
        font-weight: normal;
      }
      .header__subtitle {
        font-size: 1.2rem;
      }
    `}
  </style>
)

// const headerStyle: Style = css`
//   display: flex;
//   align-items: center;
//   min-height: 50px;
//   padding: 0.5rem 1rem;
//   background-image: linear-gradient(to right, #8e43e7, #00aeff);
//   color: #fff;
//   margin-bottom: 1rem;

//   .header__subtitle {
//     color: #fff;
//     text-decoration: none;
//   }
//   .header__title {
//     font-size: 1.2rem;
//     font-weight: normal;
//   }
//   .header__subtitle {
//     font-size: 1.2rem;
//   }
// `

export default HeaderStyle
