import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;

}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button 
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition
    "{...props}>{children}</button>
    );
};
export default Button;