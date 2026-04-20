
import { MessageCircleQuestionMark, MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Activity = ({ whatsappLink }: { whatsappLink: string }) => {
  return (
    <section>
      {/* Title */}
      <div className="bg-white px-5 py-4 rounded-tl-3xl rounded-tr-lg -mt-5 w-fit font-semibold">
        Activity Center
      </div>

      <div className="bg-white py-4 px-5">

        {/* Activity cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <MessageCircleQuestionMark className="text-primary w-6 h-6" />
              <span className="bg-secondary px-2 py-1 rounded-xl text-xs">
                Heads up
              </span>
            </div>

            <h2 className="font-semibold pt-3">FAQ</h2>
            <p className="text-sm text-gray-600">
              Please go through them to have a better knowledge of this platform
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <MessagesSquare className="text-primary w-6 h-6" />
              <span className="bg-secondary px-2 py-1 rounded-xl text-xs">
                Heads up
              </span>
            </div>

            <h2 className="font-semibold pt-3">Team Support</h2>
            <p className="text-sm text-gray-600">
              Have anything to say to us? Please contact our Support Team on Whatsapp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Activity;