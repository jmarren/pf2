"use client";
import React, {FC, ReactNode} from 'react'
import {motion, AnimatePresence} from 'framer-motion';

// interface PageWrapperProps {
//     children: ReactNode;
// }

export const PageWrapper = ({ children }) =>  (<>
    <AnimatePresence>
        <motion.div
        initial={{opacity:0, y:15}}
        animate={{opacity:1, y:0}}
        exit={{opacity: 0, y: 15}}
        transition={{delay:0.25}}
        >
            {children}
        </motion.div>
    </AnimatePresence>    
</>)

export default PageWrapper;