import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { uploadToS3 } from '../services/s3Service';

interface UploadState {
    isUploading: boolean;
    file: File | null;
    preview: string | null;
    uploadedUrl: string | null;
    error: string | null;
}

interface ProductUploadProps {
    onImageUploaded?: (url: string) => void;
}

export default function ProductUpload({ onImageUploaded }: ProductUploadProps) {
    const [uploadState, setUploadState] = useState<UploadState>({
        isUploading: false,
        file: null,
        preview: null,
        uploadedUrl: null,
        error: null
    });
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Supported file types
    const supportedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    
    const validateFile = (file: File): string | null => {
        if (!supportedTypes.includes(file.type)) {
            return 'File type not supported. Please upload JPG, PNG or JPEG format.';
        }
        
        if (file.size > maxSizeInBytes) {
            return 'File size exceeds 5MB limit.';
        }
        
        return null;
    };
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        const file = files[0];
        processFile(file);
    };
    
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            processFile(file);
        }
    };
    
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const processFile = async (file: File) => {
        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
            setUploadState({
                isUploading: false,
                file: null,
                preview: null,
                uploadedUrl: null,
                error: validationError
            });
            return;
        }
        
        // Create preview
        const previewUrl = URL.createObjectURL(file);
        
        setUploadState({
            isUploading: true,
            file,
            preview: previewUrl,
            uploadedUrl: null,
            error: null
        });
        
        try {
            // Get image URL from Fake Store API
            const publicUrl = await uploadToS3(file);
            
            setUploadState({
                isUploading: false,
                file,
                preview: previewUrl,
                uploadedUrl: publicUrl,
                error: null
            });
            
            // Notify parent component about the uploaded image URL
            if (onImageUploaded) {
                onImageUploaded(publicUrl);
            }
        } catch (error: unknown) {
            console.error('Upload error:', error);
            setUploadState({
                isUploading: false,
                file,
                preview: previewUrl,
                uploadedUrl: null,
                error: 'Failed to upload file. Please try again.'
            });
        }
    };
    
    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };
    
    const resetUpload = () => {
        setUploadState({
            isUploading: false,
            file: null,
            preview: null,
            uploadedUrl: null,
            error: null
        });
        
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        
        // Notify parent component that image was removed
        if (onImageUploaded) {
            onImageUploaded('');
        }
    };
    
    return (
        <div>
            <p className='text-upload-text1 pt-[30px]'>Product image</p>
            
            {!uploadState.file ? (
                <div 
                    className='flex flex-col items-center border border-dashed border-[#ABAFB1] rounded-[8px]'
                    style={{
                        borderStyle: 'dashed',
                        borderWidth: '2px',
                        borderImageSource: 'repeating-linear-gradient(45deg, #ABAFB1 0 4px, transparent 4px 10px)',
                        borderImageSlice: 1
                    }}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <div className="flex flex-col items-center py-7">
                        <span className="text-upload-text1 pb-[10px]">Drag and drop files</span>
                        <span className="text-upload-text1 text-[#ABAFB1] pb-[10px]">or</span>
                        <button 
                            className="text-upload-text2 border-[2px] border-[#DDE2E4] w-[69px] h-[32px] rounded-[6px] mb-[10px]"
                            onClick={handleBrowseClick}
                        >
                            Browse
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            accept=".jpg,.jpeg,.png" 
                            className="hidden" 
                        />
                        <span className="text-upload-text1 text-[#ABAFB1]">Supported file types: jpg, png and jpeg</span>
                        <span className="text-upload-text1 text-[#ABAFB1]">format</span>
                    </div>
                </div>
            ) : (
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            {uploadState.preview && (
                                <img 
                                    src={uploadState.preview} 
                                    alt="Preview" 
                                    className="w-16 h-16 object-cover rounded-md mr-4" 
                                />
                            )}
                            <div>
                                <p className="font-medium">{uploadState.file.name}</p>
                                <p className="text-sm text-gray-500">
                                    {(uploadState.file.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={resetUpload}
                            className="text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    </div>
                    
                    {uploadState.isUploading && (
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full w-1/2"></div>
                        </div>
                    )}
                    
                    {uploadState.uploadedUrl && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-green-700 font-medium">File uploaded successfully!</p>
                            <p className="text-sm break-all mt-1">
                                <a 
                                    href={uploadState.uploadedUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {uploadState.uploadedUrl}
                                </a>
                            </p>
                        </div>
                    )}
                    
                    {uploadState.error && (
                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-700">{uploadState.error}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}