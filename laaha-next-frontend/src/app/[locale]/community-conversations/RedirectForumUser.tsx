import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react"

const RedirectForumUser = () => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 z-50"
        >
          <div className="max-h-[80vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg max-w-[calc(100%-2rem)] mx-auto lg:max-w-[48rem] w-full z-60">
            <div className="py-12 px-12 text-center">
              {` This language of forum is not suppported. Please click on`} <Link className="text-blue underline" href={`${locale}/community-conversations`}> this </Link> {`to redirect to default language of forum.`}
          {/* Close modal button */}
          </div>
          <button
            className="absolute top-2 end-4 text-2xl text-default-black hover:text-color-neutral"
            onClick={() => closeModal()} // Close modal on click
          >
            &times;
          </button>
          </div>
        </div>
      )}
    </>
  )
}

export default RedirectForumUser
