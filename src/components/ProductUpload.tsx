export default function ProductUpload() {
    return (
        <div>
            <p className='text-upload-text1 pt-[30px]'>Product image</p>
            <div className='flex flex-col items-center border border-dashed border-[#ABAFB1] rounded-[8px]'
                style={{
                    borderStyle: 'dashed',
                    borderWidth: '2px',
                    borderImageSource: 'repeating-linear-gradient(45deg, #ABAFB1 0 4px, transparent 4px 10px)',
                    borderImageSlice: 1
                }}>
                <div className="flex flex-col items-center py-7">
                    <span className="text-upload-text1 pb-[10px]">Drag and drop files</span>
                    <span className="text-upload-text1 text-[#ABAFB1] pb-[10px]">or</span>
                    <button className="text-upload-text2 border-[2px] border-[#DDE2E4] w-[69px] h-[32px] rounded-[6px] mb-[10px]">Browse</button>
                    <span className="text-upload-text1 text-[#ABAFB1]">Supported file types: jpg, png and jpeg</span>
                    <span className="text-upload-text1 text-[#ABAFB1]">format</span>
                </div>
            </div>
        </div>
    )
}