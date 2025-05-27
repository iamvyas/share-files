import '../App.css'

const Navbar = ()=>{
    return(
        <nav class="sticky top-0 z-50 bg-orange-500 text-white shadow-md">
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="text-xl font-bold">Share Files</div>
        <ul class="flex space-x-6 text-lg font-medium">
          <li><a href="#" class="hover:text-yellow-200">Join</a></li>
          <li><a href="#" class="hover:text-yellow-200">Create</a></li>
          <li><a href="#" class="hover:text-yellow-200">Contact</a></li>
        </ul>
        </div>
        </nav>
    )
}

export default Navbar;