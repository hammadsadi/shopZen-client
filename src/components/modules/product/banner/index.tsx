import style from './productBanner.module.css'
const ProductBanner = ({title, path}:{title:string, path:string}) => {
  return (
    <div
      className={`${style.banner} mt-5 min-h-[120px] md:min-h-[250px] lg:min-h-[300px] flex items-center border-2 border-white rounded max-w-7xl mx-auto `}
    >
      <div className="flex justify-center items-center mx-auto">
        <div className='text-center'>
          <h3 className="font-bold text-xl md:text-3xl">{title}</h3>
          <p className="text-base text-black/65">{path}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductBanner
