import React, { memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = memo(({ path }) => {
    const [array, setArray] = useState(path)

    return (
        <div className='flex items-center pb-4 pt-3 gap-2'>
            <div>
                <Link to='/' className='text-zinc-600 text-xs'>Home</Link>
            </div>
            {
                useMemo(() => array.map((item, i) =>
                    <div key={i} className='flex items-center gap-2 pt-[3px]'>
                        <span className='text-zinc-600 text-xs'>/</span>
                        <Link to={item.href} className='text-zinc-600 text-xs pt-[1px]'>
                            {item.page}
                        </Link>
                    </div>
                ), [array])
            }
        </div>
    );
});

export default Breadcrumbs;
