const SiteDesc = ({ siteDesc }: any) => {
  return (
    <div
      style={{ minHeight: "100px" }} // Ensuring a minimum height to prevent layout shift
      dangerouslySetInnerHTML={{ __html: siteDesc?.attributes.body?.value }}
    />
  );
};

export default SiteDesc;
