const Copyright = ({ copyright }: any) => {
  return <div dangerouslySetInnerHTML={{ __html: copyright?.attributes.body?.value }} />
}

export default Copyright
