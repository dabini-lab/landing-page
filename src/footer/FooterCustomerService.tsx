const FooterCustomerService = () => (
  <div className="footer-customer-service">
    <h4>고객센터</h4>
    운영시간: 평일 09:00 - 18:00 (주말 및 공휴일 휴무)
    <br />
    이메일: support@dabinilab.com
    <style jsx>
      {`
        .footer-customer-service h4 {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        .footer-customer-service div {
          margin-bottom: 0.25rem;
        }
      `}
    </style>
  </div>
);

export { FooterCustomerService };
