import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Driver {
  name: string;
  phone: string;
  car: string;
  rating: number;
}

interface Order {
  from: string;
  to: string;
  price: number;
  driver: Driver;
  status: 'searching' | 'found' | 'completed';
}

const Index = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'support' }>>([
    { text: 'Здравствуйте! Чем могу помочь?', sender: 'support' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const calculatePrice = (from: string, to: string) => {
    const basePrice = 200;
    const distance = Math.floor(Math.random() * 15) + 3;
    return basePrice + distance * 30;
  };

  const handleOrderTaxi = () => {
    if (!fromAddress || !toAddress) {
      toast.error('Укажите адреса подачи и назначения');
      return;
    }

    const price = calculatePrice(fromAddress, toAddress);
    
    setOrder({
      from: fromAddress,
      to: toAddress,
      price,
      status: 'searching',
      driver: {
        name: '',
        phone: '',
        car: '',
        rating: 0
      }
    });

    setTimeout(() => {
      const drivers = [
        { name: 'Карл Джонсон', phone: '+7 (900) 303-0001', car: 'Declasse Premier', rating: 4.9 },
        { name: 'Томми Версетти', phone: '+7 (900) 303-0002', car: 'Benefactor Schafter', rating: 4.8 },
        { name: 'Нико Беллик', phone: '+7 (900) 303-0003', car: 'Vapid Stanier', rating: 4.7 }
      ];
      
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
      
      setOrder(prev => prev ? {
        ...prev,
        status: 'found',
        driver: randomDriver
      } : null);

      toast.success('Водитель найден!');
    }, 2000);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    setMessages([...messages, { text: newMessage, sender: 'user' }]);
    setNewMessage('');

    setTimeout(() => {
      const responses = [
        'Спасибо за обращение! Проверяю информацию...',
        'Сейчас свяжусь с водителем',
        'Всё в порядке, водитель уже в пути',
        'Чем еще могу помочь?'
      ];
      setMessages(prev => [...prev, { 
        text: responses[Math.floor(Math.random() * responses.length)], 
        sender: 'support' 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--dark-bg))] relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/d037f273-58d5-4a6b-a302-062182cc1e21/files/52544245-0537-4972-ac82-777007f2fc52.jpg')`
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--dark-bg))/80] to-[hsl(var(--dark-bg))]" />

      <div className="relative z-10">
        <header className="border-b border-[hsl(var(--border))] bg-[hsl(var(--dark-bg))/90] backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Car" className="text-[hsl(var(--neon-purple))]" size={32} />
              <div>
                <h1 className="text-2xl font-black neon-glow text-white">Los-Santos Taxi</h1>
                <p className="text-xs text-[hsl(var(--neon-orange))] neon-orange-glow font-bold">90030</p>
              </div>
            </div>
            <Badge variant="outline" className="text-[hsl(var(--neon-purple))] border-[hsl(var(--neon-purple))] neon-border">
              24/7 Онлайн
            </Badge>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))] neon-border">
              <CardHeader>
                <CardTitle className="text-2xl neon-glow flex items-center gap-2">
                  <Icon name="MapPin" size={24} />
                  Заказать такси
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Быстрая подача по всему городу
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="Circle" size={12} className="text-green-500" />
                    Откуда
                  </label>
                  <Input
                    placeholder="Улица Гроув, 1"
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    className="bg-[hsl(var(--muted))] border-[hsl(var(--border))]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Icon name="MapPin" size={12} className="text-red-500" />
                    Куда
                  </label>
                  <Input
                    placeholder="Винвуд, центр"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                    className="bg-[hsl(var(--muted))] border-[hsl(var(--border))]"
                  />
                </div>

                <Button 
                  onClick={handleOrderTaxi}
                  className="w-full bg-[hsl(var(--neon-purple))] hover:bg-[hsl(var(--neon-purple))/90] neon-border text-lg font-bold"
                  disabled={order?.status === 'searching'}
                >
                  {order?.status === 'searching' ? (
                    <>
                      <Icon name="Loader2" className="animate-spin mr-2" />
                      Ищем водителя...
                    </>
                  ) : (
                    <>
                      <Icon name="Zap" className="mr-2" />
                      Вызвать такси
                    </>
                  )}
                </Button>

                {order?.status === 'found' && (
                  <Card className="bg-[hsl(var(--muted))] border-[hsl(var(--neon-orange))] border-2 animate-fade-in">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Icon name="CheckCircle2" className="text-green-500" />
                        Водитель найден
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Водитель:</span>
                        <span className="font-bold">{order.driver.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Телефон:</span>
                        <span className="font-mono">{order.driver.phone}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Автомобиль:</span>
                        <span>{order.driver.car}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Рейтинг:</span>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="font-bold">{order.driver.rating}</span>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-[hsl(var(--border))]">
                        <div className="flex justify-between items-center text-lg">
                          <span>Стоимость:</span>
                          <span className="font-black text-[hsl(var(--neon-orange))] neon-orange-glow">
                            {order.price} ₽
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))] neon-border">
              <CardHeader>
                <CardTitle className="text-2xl neon-glow flex items-center gap-2">
                  <Icon name="MessageSquare" size={24} />
                  Поддержка
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Онлайн-чат с диспетчером
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="chat" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-[hsl(var(--muted))]">
                    <TabsTrigger value="chat">Чат</TabsTrigger>
                    <TabsTrigger value="info">Информация</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="chat" className="space-y-4">
                    <div className="h-[300px] overflow-y-auto space-y-3 p-4 bg-[hsl(var(--muted))] rounded-lg">
                      {messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.sender === 'user'
                                ? 'bg-[hsl(var(--neon-purple))] text-white'
                                : 'bg-[hsl(var(--dark-bg))] text-foreground'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Напишите сообщение..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="bg-[hsl(var(--muted))] border-[hsl(var(--border))]"
                      />
                      <Button 
                        onClick={sendMessage}
                        className="bg-[hsl(var(--neon-orange))] hover:bg-[hsl(var(--neon-orange))/90]"
                      >
                        <Icon name="Send" size={20} />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="info" className="space-y-4">
                    <div className="space-y-4 p-4 bg-[hsl(var(--muted))] rounded-lg">
                      <div className="flex items-start gap-3">
                        <Icon name="Phone" className="text-[hsl(var(--neon-purple))] mt-1" />
                        <div>
                          <h3 className="font-bold">Диспетчерская</h3>
                          <p className="text-muted-foreground">+7 (900) 303-0000</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Icon name="Clock" className="text-[hsl(var(--neon-orange))] mt-1" />
                        <div>
                          <h3 className="font-bold">Время работы</h3>
                          <p className="text-muted-foreground">Круглосуточно, без выходных</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Icon name="MapPin" className="text-[hsl(var(--neon-purple))] mt-1" />
                        <div>
                          <h3 className="font-bold">Зона покрытия</h3>
                          <p className="text-muted-foreground">Весь Los-Santos и пригороды</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Icon name="CreditCard" className="text-[hsl(var(--neon-orange))] mt-1" />
                        <div>
                          <h3 className="font-bold">Способы оплаты</h3>
                          <p className="text-muted-foreground">Наличные, карта, безнал</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-7xl mx-auto">
            <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-[hsl(var(--neon-purple))] transition-all">
              <CardContent className="pt-6 text-center space-y-2">
                <Icon name="Zap" size={40} className="mx-auto text-[hsl(var(--neon-purple))]" />
                <h3 className="font-bold text-lg">Быстрая подача</h3>
                <p className="text-sm text-muted-foreground">Автомобиль подадут за 3-5 минут</p>
              </CardContent>
            </Card>

            <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-[hsl(var(--neon-orange))] transition-all">
              <CardContent className="pt-6 text-center space-y-2">
                <Icon name="Shield" size={40} className="mx-auto text-[hsl(var(--neon-orange))]" />
                <h3 className="font-bold text-lg">Безопасность</h3>
                <p className="text-sm text-muted-foreground">Проверенные водители с лицензией</p>
              </CardContent>
            </Card>

            <Card className="bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-[hsl(var(--neon-purple))] transition-all">
              <CardContent className="pt-6 text-center space-y-2">
                <Icon name="DollarSign" size={40} className="mx-auto text-[hsl(var(--neon-purple))]" />
                <h3 className="font-bold text-lg">Честные цены</h3>
                <p className="text-sm text-muted-foreground">Прозрачный расчет без накруток</p>
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="mt-16 border-t border-[hsl(var(--border))] bg-[hsl(var(--dark-bg))/90] backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Icon name="Car" className="text-[hsl(var(--neon-purple))]" size={24} />
                <span className="font-bold neon-glow">Los-Santos Taxi 90030</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2025 Los-Santos Taxi. Самое быстрое такси в городе
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
