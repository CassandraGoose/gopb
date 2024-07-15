import { Navbar, Button, Menu } from 'react-daisyui';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <Navbar className="shadow-inner shadow-sm px-8">
      <div className="flex-1">
        <Link to="/"><p className="text-4xl text-primary font-bold">GOPB!</p></Link>
      </div>
      <div className="flex-none">
        <Menu horizontal={true} className="px-1">
          <Menu.Item>
            <Link to="/about">ABOUT</Link>
          </Menu.Item>
        </Menu>
      </div>
    </Navbar>
  )
}