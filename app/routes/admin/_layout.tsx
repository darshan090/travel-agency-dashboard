import { Outlet, useLoaderData } from 'react-router'
import { SidebarComponent } from '@syncfusion/ej2-react-navigations'
import { MobileSidebar, Navitems } from 'components'
import { account } from '~/appwrite/client';
import { redirect } from 'react-router';
import { getExistingUser, storeUserData } from '~/appwrite/auth';

export async function loader() {
  try {
    const user = await account.get();
    if (!user.$id) return redirect('/sign-in');

    const existingUser = await getExistingUser(user.$id);
    if (existingUser?.status === 'user') {
      return redirect('/');
    }

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.error('Error in admin layout loader:', error);
    return redirect('/sign-in');
  }
}

const AdminLayout = () => {
  const user = useLoaderData();
  console.log('Admin layout user:', user); // Debug log

  return (
    <div className='admin-layout'>
      <MobileSidebar />
      <aside className='w-full max-w-[270px] hidden lg:block'>
        <SidebarComponent width={270} enableGestures={false}>
          <Navitems />
        </SidebarComponent>
      </aside>
      <aside className='children'>
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;