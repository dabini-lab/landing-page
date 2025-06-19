import { FooterBusinessInfo } from './FooterBusinessInfo';
import { FooterCopyright } from './FooterCopyright';
import { FooterCustomerService } from './FooterCustomerService';

const BaseFooter = () => (
  <div className="text-left">
    {/* {props.logo} */}

    {/* <nav>
      <ul className="navbar mt-5 flex flex-row justify-start text-xl font-medium text-gray-800">
        {props.children}
      </ul>
    </nav> */}

    {/* <div className="mt-8 flex justify-start">
      <FooterIconList>{props.iconList}</FooterIconList>
    </div> */}

    <div className="mt-8 text-sm">
      <FooterCopyright />
      <br />
      <FooterCustomerService />
      <br />
      <FooterBusinessInfo />
    </div>

    <style jsx>
      {`
        .navbar :global(li) {
          @apply mx-4;
        }
      `}
    </style>
  </div>
);

export { BaseFooter };
