import { NextPage } from 'next'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  Dropdown,
  DropdownAction,
  DropdownComponent,
} from '../components/Dropdown'
import { MainLayout } from '../layouts/MainLayout'

interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = ({}) => {
  return (
    <MainLayout>
      <div className="mt-4 flex flex-col space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto">
          <div className="p-12 bg-white border border-gray-300 rounded-[0.3rem] items-center justify-center text-center shadow-sm">
            <div className="text-2xl font-semibold">11</div>
            <div>trees created</div>
            <a href="#" className="hover:underline hover:text-teal-800">
              <span>create a new tree</span>
            </a>
          </div>
          <div className="p-12 bg-white border border-gray-300 rounded-[0.3rem] items-center justify-center text-center shadow-sm">
            <div className="text-2xl font-semibold">7</div>
            <div>trees saved</div>
            <a href="#" className="hover:underline hover:text-teal-800">
              browse trees
            </a>
          </div>
        </div>
        <div className="rounded-lg shadow-sm">
          <div className="font-medium p-2">Trees created</div>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-white border border-gray-300 whitespace-nowrap">
                <th className="text-sm font-medium px-6 py-4 text-left">
                  Name
                </th>
                <th className="text-sm font-medium px-6 py-4 text-left">
                  Links
                </th>
                <th className="text-sm font-medium px-6 py-4 text-left">
                  Views
                </th>
                <th className="text-sm font-medium px-6 py-4 text-left">
                  Created At
                </th>
                <th className="text-sm font-medium px-6 py-4 text-left"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-sm">
              <tr className=" bg-white align-text-top">
                <td className="px-6 py-4 font-medium">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                  accusamus repudiandae perferendis laudantium tempora cumque!
                  Autem eligendi fuga sint nisi.
                </td>
                <td className="px-6 py-4">11</td>
                <td className="px-6 py-4">8659</td>
                <td className="px-6 py-4 whitespace-nowrap">Jun 11, 2022</td>
                <td className="px-6 py-4 text-right">
                  <Dropdown
                    component={DropdownComponent.ICON}
                    Icon={BsThreeDotsVertical}
                    dropdownItems={[
                      {
                        title: 'Go',
                        action: DropdownAction.EXTERNAL_LINK,
                        href: '/#',
                      },
                      {
                        title: 'Edit',
                        action: DropdownAction.EXTERNAL_LINK,
                        href: '/#',
                      },
                      {
                        title: 'Remove',
                        action: DropdownAction.BUTTON,
                        clickHandler: async () => {
                          console.log('clicked dropdown')
                        },
                      },
                    ]}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-lg shadow-sm">
          <div className="font-medium p-2">Saved trees</div>
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-white border border-gray-300 whitespace-nowrap">
                <th className="text-sm font-medium px-6 py-4 text-left">
                  Name
                </th>
                <th className="text-sm font-medium px-6 py-4 text-left">
                  Links
                </th>
                <th className="text-sm font-medium px-6 py-4 text-left"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-sm">
              <tr className=" bg-white align-text-top">
                <td className="px-6 py-4 font-medium">
                  Lorem ipsum dolor sit amet consectetur.
                </td>
                <td className="px-6 py-4">11</td>
                <td className="px-6 py-4 text-right">
                  <Dropdown
                    component={DropdownComponent.ICON}
                    Icon={BsThreeDotsVertical}
                    dropdownItems={[
                      {
                        title: 'Go',
                        action: DropdownAction.EXTERNAL_LINK,
                        href: '/#',
                      },
                      {
                        title: 'Unsave',
                        action: DropdownAction.BUTTON,
                        clickHandler: async () => {
                          console.log('clicked dropdown')
                        },
                      },
                    ]}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
