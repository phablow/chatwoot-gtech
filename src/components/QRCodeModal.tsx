import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useWhatsAppConnection } from '@/hooks/useWhatsAppConnection'

export const QRCodeModal = () => {
  const { qrCode, isConnected } = useWhatsAppConnection()

  return (
    <Dialog open={!isConnected}>
      <DialogContent>
        <div className="flex flex-col items-center p-4">
          <h3 className="text-lg font-medium mb-4">
            Conectar WhatsApp
          </h3>
          {qrCode ? (
            <img 
              src={qrCode} 
              alt="QR Code WhatsApp" 
              className="w-64 h-64"
            />
          ) : (
            <Button onClick={getQrCode}>
              Gerar QR Code
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
