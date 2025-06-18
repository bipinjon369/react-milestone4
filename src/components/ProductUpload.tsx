import { useState, useRef, useEffect, ChangeEvent, DragEvent } from 'react';
import { uploadToS3 } from '../services/s3Service';

interface UploadState {
    isUploading: boolean;
    file: File | null;
    preview: string | null;
    uploadedUrl: string | null;
    error: string | null;
}

interface ProductUploadProps {
    error?: string;
    onImageUploaded?: (url: string) => void;
}

export default function ProductUpload({ error, onImageUploaded }: ProductUploadProps) {
    const [uploadState, setUploadState] = useState<UploadState>({
        isUploading: false,
        file: null,
        preview: null,
        uploadedUrl: null,
        error: null
    });
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Update error state when prop changes
    useEffect(() => {
        if (error) {
            setUploadState(prev => ({ ...prev, error }));
        }
    }, [error]);
    
    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            if (uploadState.preview) {
                URL.revokeObjectURL(uploadState.preview);
            }
        };
    }, [uploadState.preview]);
    
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
        e.stopPropagation(); // Prevent event bubbling
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
        
        // Clean up previous preview URL
        if (uploadState.preview) {
            URL.revokeObjectURL(uploadState.preview);
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
            const publicUrl = await uploadToS3(file);
            
            setUploadState(prev => ({
                ...prev,
                isUploading: false,
                uploadedUrl: publicUrl,
                error: null
            }));
            
            // Notify parent component that image was uploaded successfully
            onImageUploaded?.(publicUrl);
            
        } catch (error: unknown) {
            console.error('Upload error:', error);
            setUploadState(prev => ({
                ...prev,
                isUploading: false,
                uploadedUrl: null,
                error: 'Failed to upload file. Please try again.'
            }));
        }
    };
    
    const handleBrowseClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent form submission
        e.stopPropagation(); // Prevent event bubbling
        fileInputRef.current?.click();
    };
    
    const resetUpload = () => {
        // Clean up the object URL
        if (uploadState.preview) {
            URL.revokeObjectURL(uploadState.preview);
        }
        
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
        onImageUploaded?.('');
    };
    
    const currentError = uploadState.uploadedUrl ? null : (uploadState.error || error);
    
    return (
        <div className='pb-6'>
            <span className='text-label-text text-[#5E6366] pt-[30px] pb-[6px]'>Product image</span><span className="text-red-500 text-label-text ml-1">*</span>
            
            {!uploadState.file ? (
                <div 
                    className='flex flex-col items-center border border-dashed border-[#ABAFB1] rounded-[8px] p-7'
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <span className="text-upload-text1 pb-[10px]">Drag and drop files</span>
                    <span className="text-upload-text1 text-[#ABAFB1] pb-[10px]">or</span>
                    <button 
                        className="text-upload-text2 border-[2px] border-[#DDE2E4] w-[69px] h-[32px] rounded-[6px] mb-[10px] hover:bg-gray-50"
                        onClick={handleBrowseClick}
                        type="button" // Explicitly set button type to prevent form submission
                        disabled={uploadState.isUploading}
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
                    <span className="text-upload-text1 text-[#ABAFB1]">Supported file types: jpg, png and jpeg format</span>
                </div>
            ) : (
                <div className='relative w-fit'>
                    {uploadState.isUploading && (
                        <div className="absolute inset-0 bg-black/20 rounded-[8px] flex items-center justify-center">
                            <div className="text-white">Uploading...</div>
                        </div>
                    )}
                    {uploadState.preview && (
                        <>
                            <img 
                                src={uploadState.preview} 
                                alt="Preview" 
                                className="h-[198px] rounded-[8px] object-cover" 
                            />
                            <button 
                                onClick={resetUpload}
                                type="button" // Explicitly set button type to prevent form submission
                                className="absolute top-3 right-3 transition-colors"
                                disabled={uploadState.isUploading}
                            >
                                <img className='w-6 h-6' src='close_image.svg' alt="Close"/>
                            </button>
                        </>
                    )}
                </div>
            )}
            
            {currentError && (
                <p className="text-red-500 text-sm mt-2">{currentError}</p>
            )}
        </div>
    );
}