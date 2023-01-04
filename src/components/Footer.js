export default function Footer() {
    return (
            <div className="flex flex-col text-gray-500  gap-1">
                    <ol className="flex flex-row flex-wrap cursor-pointer gap-1 text-xs">
                        <li>Hakkında</li>
                        <li>Yardım</li>
                        <li>Basın</li>
                        <li>API</li>
                        <li>İş Fırsatları</li>
                        <li>Gizlilik</li>
                        <li>Koşullar</li>
                        <li>Konumlar</li>
                        <li>Dil</li>
                    </ol>
                        <small className="text-xs">© {(new Date().getFullYear())} INSTAGRAM FROM META</small>                
            </div>
    )
}