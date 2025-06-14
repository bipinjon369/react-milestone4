// AWS Configuration
// IMPORTANT: In a production environment, these values should be stored in environment variables
// and not hardcoded in the source code

export const awsConfig = {
  region: 'us-east-1', // Replace with your AWS region
  bucketName: 'your-s3-bucket-name', // Replace with your S3 bucket name
  
  // For development/testing only - in production use AWS Cognito, IAM roles, or backend authentication
  // NEVER include actual AWS credentials in frontend code
  credentials: {
    // These should be loaded from environment variables in a real application
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || '',
  }
};

// Instructions for setting up S3 bucket for public access:
// 1. Create an S3 bucket with appropriate CORS configuration
// 2. Set up a bucket policy to allow public read access if needed
// 3. Configure environment variables for your AWS credentials
// 4. For production, use pre-signed URLs or a backend API for secure uploads