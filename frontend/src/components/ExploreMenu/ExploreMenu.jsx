import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our Menu</h1>
            {/* <p className='explore-menu-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus necessitatibus beatae itaque aliquid ullam modi corrupti velit, nisi magni accusantium distinctio, voluptate ratione? Molestiae nostrum dolores quam, magnam aspernatur nam.</p> */}
            <p className='explore-menu-text'>
                Discover our wide variety of delicious meals, from light snacks to hearty mains.
                <br />
                Each dish is prepared with fresh ingredients and a touch of culinary magic.
                <br />
                Browse through our categories and satisfy your cravings today!
            </p>

            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={() => { setCategory((prev) => prev === item.menu_name ? "All" : setCategory(item.menu_name)) }} key={index} className='explore-menu-list-item'>
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                        /*<div 
                            onMouseEnter={() => setCategory(item.menu_name)} 
                            onMouseLeave={() => setCategory("All")} 
                            key={index} 
                            className='explore-menu-list-item'
                        >
                            <img 
                                className={category === item.menu_name ? "active" : ""} 
                                src={item.menu_image} 
                                alt="" 
                            />
                            <p>{item.menu_name}</p>
                        </div> //use these for hover effect on items
                        */
                    )
                })}
            </div>
            <hr />


        </div>
    )
}

export default ExploreMenu
