import "./../../styles/shimmer.scss"

export const ListingShimmer = () => (
  <div className="shimmer-wrapper flex flex-col gap-3 container">
    <div className="shimmer-item"></div>
    <div className="content-items flex gap-4 flex-wrap my-10">
      <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
      <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
      <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
      <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
    </div>
  </div>
)

export const ResourceListingShimmer = () => {
  return (
    <div className="shimmer-wrapper flex flex-col gap-3 container">
      <div className="shimmer-item"></div>
      <div className="content flex gap-4 flex-wrap mt-10">
        <div className="sidebar w-full lg:max-w-[calc(25%-1rem)]">
          <div className="shimmer-item"></div>
        </div>
        <div className="content-items w-full flex gap-4 lg:max-w-[calc(75%-1rem)] flex-wrap mb-10">
          <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
          <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
          <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
          <div className="shimmer-item lg:max-w-[calc(25%-1rem)]"></div>
        </div>
      </div>
    </div>
  )
}

export const ListingShimmer3col = () => {
  return (
    <div className="shimmer-wrapper flex flex-col gap-3 container">
      <div className="content-items w-full flex gap-4 flex-wrap mb-10">
        <div className="shimmer-item lg:max-w-[calc(33.33%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(33.33%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(33.33%-1rem)]"></div>
      </div>
    </div>
  )
}

export const ViewCountShimmer = () => {
  return (
    <div className="shimmer-wrapper hidden flex-col gap-3 container">
      <div className="shimmer-effect bg-white overflow-hidden relative h-6 max-w-24"></div>
    </div>
  )
}

export const BasicPageShimmer = () => {
  return (
    <div className="shimmer-wrapper flex flex-col gap-3 container">
      <div className="shimmer-item"></div>
      <div className="shimmer-item"></div>
      <div className="shimmer-item"></div>
    </div>
  )
}

export const BasicShimmer = () => {
  return (
    <div className="shimmer-wrapper flex flex-col gap-3 container">
      <div className="shimmer-item"></div>
    </div>
  )
}

export const CategoryPageShimmer = () => {
  return (
    <div className="category-loader">
      <div className="cat-header container flex justify-center gap-4 items-center py-10">
        <div className="shimmer-item-effect w-10 h-10 rounded-[50%]"></div>
        <div className="shimmer-item-effect w-40 h-8 block"></div>
      </div>
      <SimpleCardShimmer />
    </div>
  )
}

export const SimpleCardShimmer = () => {
  return (
    <div className="container flex flex-wrap gap-6">
      <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
      <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
      <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
      <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
      <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
      <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
      <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
      <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
    </div>
  )
}

export const SubcategoryShimmer = () => {
  return (
    <>
      <div className="container mb-12">
        <div className="shimmer-item-effect w-full h-[400px] lg:h-[500px] block"></div>
      </div>
      <div className="container flex flex-wrap gap-6">
        <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
        <div className="shimmer-item lg:max-w-[calc(23%-1rem)]"></div>
      </div>
    </>
  )
}

export const GeneralLoader = () => {
  return (
    <div className="min-h-[1000px]">
      <div className="loading-state">
        <div className="loading"></div>
      </div>
    </div>
  )
}

export const MenuItemsShimmer = () => {
  return (
    <div className="shimmer-wrapper flex flex-col gap-3 container max-w-full">
      <div className="shimmer-item"></div>
    </div>
  )
}

export const BannerShimmer = () => {
  return (
    <div className="shimmer-wrapper flex flex-col gap-3 container">
      <div className="shimmer-item-effect lg:my-20 h-[800px] lg:h-[600px] block"></div>
    </div>
  )
}

export const StoriesShimmer = () => {
  return (
    <div className="shimmer-wrapper flex flex-row mb-12 flex-wrap md:flex-nowrap gap-3 container">
      <div className="left-content w-full md:w-[35%]">
        <div className="shimmer-item-effect h-[400px]"></div>
      </div>
      <div className="right-content columns-2 w-full md:w-[65%] gap-4 md:gap-8 flex flex-wrap">
        <div className="shimmer-item-effect h-40 lg:flex-[0_0_45%] p-[28px] rounded-xl bg-white inline-block mt-4"></div>
        <div className="shimmer-item-effect h-40 lg:flex-[0_0_45%] p-[28px] rounded-xl bg-white inline-block mt-4"></div>
        <div className="shimmer-item-effect h-40 lg:flex-[0_0_45%] p-[28px] rounded-xl bg-white inline-block mt-4"></div>
        <div className="shimmer-item-effect h-40 lg:flex-[0_0_45%] p-[28px] rounded-xl bg-white inline-block mt-4"></div>
      </div>
    </div>
  )
}

export const FindServicesShimmer = () => {
  return (
    <div className="find-services-wrapper bg-primary lg:h-25 block text-white py-6 font-univers">
      <div className="container">
        <div className="find-services__content flex justify-between items-center flex-wrap md:flex-nowrap">
          <div className="content__wrapper">
            <div className="description text-l h-4"></div>
          </div>
          <a
            href={`#`}
            className={`cta h-16 w-40 bg-color-tertiary text-default-black text-l font-semibold py-4 px-6 rounded-md mt-4 md:mt-0 text-nowrap hover:underline`}
          ></a>
        </div>
      </div>
    </div>
  )
}

export const MenuShimmer = () => {
  return (
    <ul className="hidden lg:flex flex-wrap gap-8 mt-8 ps-0 list-none lg:mt-0">
      <li className={`flex items-center gap-5`}>
        <span className="w-8 h-8 shimmer-item-effect rounded-[50%]"></span>
        <span className="shimmer-item-effect w-24 h-5 block"></span>
      </li>

      <li className={`flex items-center gap-5`}>
        <span className="w-8 h-8 shimmer-item-effect rounded-[50%]"></span>
        <span className="shimmer-item-effect w-24 h-5 block"></span>
      </li>
      <li className={`flex items-center gap-5`}>
        <span className="w-8 h-8 shimmer-item-effect rounded-[50%]"></span>
        <span className="shimmer-item-effect w-24 h-5 block"></span>
      </li>
      <li className={`flex items-center gap-5`}>
        <span className="w-8 h-8 shimmer-item-effect rounded-[50%]"></span>
        <span className="shimmer-item-effect w-24 h-5 block"></span>
      </li>
    </ul>
  )
}

export const SpecialTopicsShimmer = () => {
  return (
    <>
      <h3 className="container mb-8">
        {" "}
        <span className="shimmer-item-effect w-full h-14 block"></span>{" "}
      </h3>
      <div className="container w-full flex flex-col lg:flex-row gap-8 mb-10 justify-between">
        <div className="shimmer-item-effect  rounded-xl min-h-[450px] lg:flex-[0_0_50%] w-full block"></div>
        <div className="shimmer-item-effect  rounded-xl min-h-[450px] lg:flex-[0_0_50%] w-full block"></div>
      </div>
    </>
  )
}

export const HowCanLaahaHelpYouShimmer = () => {
  return (
    <>
      <div className="bg-[#d7f0fe] py-[42px] mb-8">
        <h3 className="container mb-8">
          {" "}
          <span className="shimmer-item-effect-white w-full h-14 block"></span>{" "}
        </h3>

        <div className="shimmer-wrapper flex flex-row flex-wrap gap-3 container">
          <div className="flex gap-[30px] flex-wrap md:flex-nowrap w-full">
            <div className="shimmer-item-effect-white h-[20rem]  rounded-lg flex-[0_0_100%] lg:flex-[0_0_32%] block"></div>
            <div className="shimmer-item-effect-white h-[20rem]  rounded-lg flex-[0_0_100%] lg:flex-[0_0_32%] block"></div>
            <div className="shimmer-item-effect-white h-[20rem] rounded-lg flex-[0_0_100%] lg:flex-[0_0_32%] block"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export const ContentMadeForYouShimmer = () => {
  return (
    <>
      <div className="container mb-12">
        <h3 className="mb-8">
          {" "}
          <span className="shimmer-item-effect w-full h-14 block"></span>{" "}
        </h3>

        <div className="flex gap-8 flex-wrap md:flex-nowrap w-full">
          <div className="shimmer-item-effect lg:flex-[0_0_50%] block h-[22rem] w-full"></div>
          <div className="flex flex-col gap-y-8 lg:flex-[0_0_50%]">
            <div className="shimmer-item-effect block w-screen md:w-auto h-[10rem]"></div>
            <div className="shimmer-item-effect block w-screen md:w-auto h-[10rem]"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export const LearningPathShimer = () => {
  return (
    <>
      <div className="container mb-12">
        <h3 className="mb-8">
          <span className="shimmer-item-effect w-full h-14 block"></span>
        </h3>
        <div className="flex gap-8 flex-wrap md:flex-nowrap w-full">
          <div className=" lg:flex-[0_0_22%] shimmer-item-effect block w-screen md:w-auto h-[20rem]"></div>
          <div className=" lg:flex-[0_0_22%] shimmer-item-effect block w-screen md:w-auto h-[20rem]"></div>

          <div className=" lg:flex-[0_0_22%] shimmer-item-effect block w-screen md:w-auto h-[20rem]"></div>
          <div className=" lg:flex-[0_0_22%] shimmer-item-effect block w-screen md:w-auto h-[20rem]"></div>
        </div>
      </div>
    </>
  )
}
