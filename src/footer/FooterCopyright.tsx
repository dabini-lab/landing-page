const FooterCopyright = () => (
  <div className="footer-copyright">
    Copyright © 다빈이랩. All Rights Reserved.
    {/*
     * PLEASE READ THIS SECTION
     * I'm an indie maker with limited resources and funds, I'll really appreciate if you could have a link to my website.
     * The link doesn't need to appear on every pages, one link on one page is enough.
     * For example, in the `About` page. Thank you for your support, it'll mean a lot to me.
     */}
    <style jsx>
      {`
        .footer-copyright :global(a) {
          @apply text-primary-500;
        }

        .footer-copyright :global(a:hover) {
          @apply underline;
        }
      `}
    </style>
  </div>
);

export { FooterCopyright };
